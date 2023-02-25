import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { ApiCallsService } from './api-calls.service';
import { Movie } from './search.model';

class ApiService {
  constructor(private apiCallService: ApiCallsService) {}

  checkMovieExists(movieName: string): Observable<boolean> {
    return this.apiCallService.getSavedMovie().pipe(
      // getSavedMovie
      map((response) => {
        const movieExists = response.some(
          (movie: Movie) => movie.Title === movieName
        );

        return !movieExists;
      })
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
        // console.log(movieExists ? 'mari' : null);
        return movieExists ? { movieExists } : null;
      })
    );
  };
}
