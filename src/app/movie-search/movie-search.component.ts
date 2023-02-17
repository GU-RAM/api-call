import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  concat,
  concatMap,
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
import { ToastrService } from 'ngx-toastr';
import { Country, Movie, Currency } from '../search.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent {
  searchMovie = new FormControl();

  movieSearchResult$: Observable<any> | undefined;

  constructor(
    private apiCallsService: ApiCallsService,
    private toastr: ToastrService
  ) {}

  private getEmptyResult() {
    const empty: Movie | Country = {
      Title: '',
      Released: 0,
      Actors: '',
      Countries: [],
      // name: { common: '' },
      // currencies: {},
      // flags: { png: '' },
      // population: 0,
    };

    return of(empty);
  }

  private getOnMovieInfo(info: any): Movie {
    return {
      Title: info?.Title,
      Released: info?.Released,
      Actors: info?.Actors.split(', ')
        .map((el: string) => el.split(' ')[0])
        .join(', '),
      Countries: info?.Country.split(','),
    };
  }

  calculateMovieAge(releasedDate: number): number {
    const releaseYear = new Date(releasedDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - releaseYear;
  }

  getCurrencies(currencies: Currency) {
    return Object.keys(currencies)[0];
  }

  ngOnInit() {
    this.movieSearchResult$ = this.searchMovie.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((movieName) => {
        if (movieName.length > 3 && movieName.length < 100) {
          return this.apiCallsService.searchMovies(movieName).pipe(
            map((info: any) => {
              return this.getOnMovieInfo(info);
            })
          );
        }
        return this.getEmptyResult();
      }),
      concatMap((movie) => {
        const countries$: Observable<Country>[] = movie.Countries.map(
          (country) => this.apiCallsService.searchCurrencyFlagName(country)
        );

        return forkJoin([of(movie), forkJoin(countries$)]);
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.message);

        return this.getEmptyResult();
      })
    );
  }
}
