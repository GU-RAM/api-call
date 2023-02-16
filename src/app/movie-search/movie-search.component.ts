import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ApiCallsService } from '../api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../search.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent {
  searchMovie = new FormControl();

  movieSearchResult$: Observable<Movie> | undefined;
  // movieSearchResult$: any;

  constructor(
    private apiCallsService: ApiCallsService,
    private toastr: ToastrService
  ) {}

  private getEmptyResult() {
    const empty: Movie = {
      Title: '',
      Released: 0,
      Actors: '',
    };

    return of(empty);
  }

  ngOnInit() {
    this.movieSearchResult$ = this.searchMovie.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((movieName) => {
        if (movieName.length > 2 && movieName.length < 100) {
          return this.apiCallsService.searchMovies(movieName);
        }
        return this.getEmptyResult();
      }),
      tap(console.log),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);

        return this.getEmptyResult();
      })
    );
  }
}
