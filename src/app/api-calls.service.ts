import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './search.model';
import { API_URLS } from './token';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(
    private http: HttpClient,
    @Inject(API_URLS) private apiUrls: { [key: string]: string }
  ) {}

  searchMovies(movieName: string): Observable<Movie> {
    const params = new HttpParams().set('t', movieName);

    return this.http.get<Movie>(
      `${this.apiUrls['apiBaseMovies']}/?${params}}&apikey=c69771f5`
    );
  }
}
