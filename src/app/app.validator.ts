import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ApiCallsService } from './api-calls.service';
import { addMyMovie, Movie } from './search.model';

class ApiService {
  constructor(private apiCallService: ApiCallsService) {}

  checkMovieExists(movieName: string): Observable<boolean> {
    return this.apiCallService.getSavedMovie().pipe(
      map((response) => {
        let movieExists = response.some(
          (movie: Movie) => movie.Title.toLocaleLowerCase() === movieName
        );

        if (!movieExists) {
          return this.checkCreatedMovies(movieName);
        }

        return of(movieExists);
      }),
      switchMap((movieExists) => {
        console.log(movieExists);
        return movieExists;
      })
    );
  }

  private checkCreatedMovies(movieName: string): Observable<boolean> {
    return this.apiCallService.getCreateddMovie().pipe(
      map((data) =>
        data.some((movie: addMyMovie) => {
          if (movie.name) {
            return movie.name.toLocaleLowerCase() === movieName;
          }
          return false;
        })
      )
    );
  }
}

export function movieExistsValidator(
  apiCallService: ApiCallsService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const apiService = new ApiService(apiCallService);

    return apiService.checkMovieExists(control.value).pipe(
      map((movieExists) => {
        return movieExists ? { movieExists } : null;
      })
    );
  };
}
