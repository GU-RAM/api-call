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

  moviesSearchResult$: any;

  constructor(
    private apiCallsService: ApiCallsService,
    private toastr: ToastrService
  ) {}

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
        let checkedCountries: any[] = [
          ...new Set(
            minutesCountries
              .map((minutesCountry: any) => minutesCountry.country)
              .flat()
          ),
        ];

        const populations = checkedCountries.map((country) => {
          return this.apiCallsService.searchCurrencyFlagName(country).pipe(
            switchMap((countryInfo) => {
              return of(countryInfo.population);
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
      switchMap((populaTionMinutes: any) => {
        console.log(populaTionMinutes.population);
        let totalPopulation = 0;
        let totalMinutes = 0;
        populaTionMinutes.population.forEach(
          (populations: number) => (totalPopulation += populations)
        );

        populaTionMinutes.minutes.forEach(
          (minute: number) => (totalMinutes += minute)
        );

        return forkJoin([of(totalPopulation), of(totalMinutes)]);
      })
      // catchError((error: HttpErrorResponse) => {
      //   this.toastr.error(error.message);

      //   return null;
      // })
    );
  }
}
