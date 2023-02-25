import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-three-inputs-search',
  templateUrl: './three-inputs-search.component.html',
  styleUrls: ['./three-inputs-search.component.scss'],
})
export class ThreeInputsSearchComponent {
  searchMovie1 = new FormControl();
  searchMovie2 = new FormControl();
  searchMovie3 = new FormControl();

  moviesSearchResult$: Observable<any> | undefined;

  constructor(private apiCallsService: ApiCallsService) {}

  getMovies(movieName: string) {
    return this.apiCallsService.searchMovies(movieName).pipe();
  }

  getMinutes(movieName: string): Observable<number> {
    return this.apiCallsService.searchMovies(movieName).pipe(
      map((movie) => {
        const time = movie?.Runtime;
        if (time) {
          const parts = time.split(' ');
          if (parts.length === 2 && parts[1] === 'min') {
            return Number(parts[0]);
          }
        }
        throw new Error('Invalid movie runtime'); // Throw an error if the runtime is invalid or not available
      })
    );
  }

  ngOnInit() {
    this.moviesSearchResult$ = combineLatest([
      this.searchMovie1.valueChanges,
      this.searchMovie2.valueChanges,
      this.searchMovie3.valueChanges,
    ]).pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((movieNames) => {
        return forkJoin(
          movieNames.map((e) => this.apiCallsService.searchMovies(e))
        );
      }),
      map((movieInfos: any) => {
        return movieInfos.map((m: any) => {
          return {
            minutes: parseInt(m.Runtime),
            country: m.Country.split(', '),
          };
        });
      }),
      switchMap((minutesCountries) => {
        Array.from(new Set());
        const checkedCountries: any[] = [
          ...new Set(
            minutesCountries
              .map((minutesCountry: any) => minutesCountry.country)
              .flat()
          ),
        ];

        const populations = checkedCountries.map((country) => {
          return this.apiCallsService
            .searchPopulationCurrencyFlagName(country)
            .pipe(
              map((countryInfo) => {
                return countryInfo.population;
              })
            );
        });

        return forkJoin(populations).pipe(
          switchMap((populations) => {
            return of({
              population: populations,
              minutes: minutesCountries.map(
                (minuteCountry: any) => minuteCountry.minutes
              ),
            });
          })
        );
      }),
      map((populaTionMinutes: any) => {
        const totalPopulation = populaTionMinutes.population.reduce(
          (a: any, c: any) => a + c,
          0
        );
        const totalMinutes = populaTionMinutes.minutes.reduce(
          (a: any, c: any) => a + c,
          0
        );
        return {
          totalPopulation,
          totalMinutes,
        };
      })
    );
  }
}
