import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { ApiCallsService } from '../api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { Country, Movie, Currency } from '../search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent {
  searchMovie = new FormControl();

  movieSearchResult$: Observable<any> | undefined;
  addedMovieButton: Boolean = false;

  constructor(
    private apiCallsService: ApiCallsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private getEmptyResult() {
    const empty = {
      Title: '',
      Released: 0,
      Actors: '',
      Countries: [],
      Poster: '',
    };

    return of(empty);
  }

  private getOnMovieInfo(info: Movie) {
    return {
      Title: info?.Title,
      Released: info?.Released,
      Actors: info?.Actors.split(', ')
        .map((el: string) => el.split(' ')[0])
        .join(', '),
      Countries: info?.Country.split(','),
      Poster: info?.Poster,
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

  shareFavoriteMovie(
    movieInfo: Movie,
    countryInfo: Country[],
    favoriteMovies: Movie[]
  ) {
    if (favoriteMovies.every((movie) => movie.Title !== movieInfo?.Title)) {
      this.apiCallsService.favoriteMovie = {
        ...movieInfo,
        CountryInfo: countryInfo,
      };
      this.router.navigate(['/rate-comment-add']);
    } else {
      this.addedMovieButton = true;
    }
  }

  ngOnInit() {
    this.movieSearchResult$ = this.searchMovie.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((movieName) => {
        if (movieName.length > 3 && movieName.length < 100) {
          return this.apiCallsService.searchMovies(movieName).pipe(
            map((info: Movie) => {
              return (this.addedMovieButton = false), this.getOnMovieInfo(info);
            }),
            catchError((error: HttpErrorResponse) => {
              this.toastr.error(error.message);
              return this.getEmptyResult();
            })
          );
        }
        return this.getEmptyResult();
      }),
      concatMap((movie) => {
        const countries$: Observable<Country>[] = movie.Countries.map(
          (country: string) =>
            this.apiCallsService.searchPopulationCurrencyFlagName(country)
        );

        const favoriteMovies$: Observable<Movie[]> =
          this.apiCallsService.getSavedMovie();

        return countries$.length
          ? forkJoin([of(movie), forkJoin(countries$), favoriteMovies$])
          : of(movie);
      }),
      catchError(() => {
        return this.getEmptyResult();
      })
    );
  }
}
