import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  favoriteMovie: Movie | undefined;
}
