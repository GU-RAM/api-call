import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { mergeMap, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country, Movie, RunTime, SaveMovie } from './search.model';
import { API_URLS } from './token';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  favoriteMovie: Movie | undefined;

  constructor(
    private http: HttpClient,
    @Inject(API_URLS) private apiUrls: { [key: string]: string }
  ) {}

  searchMovies(movieName: string): Observable<any> {
    const params = new HttpParams().set('t', movieName);

    return this.http.get<Movie>(`${this.apiUrls['apiBaseMovies']}/`, {
      params,
    });
  }

  searchCurrencyFlagName(country: string): Observable<Country> {
    console.log(country);

    const countryData = this.http.get<Country>(
      `${this.apiUrls['apiBaseCountries']}/name/${country.trim()}?fullText=true`
    );

    return countryData.pipe(
      mergeMap((country: any) => {
        const country0 = country[0];
        return of({
          name: country0.name.common,
          currencies: country0.currencies,
          flags: country0.flags.png,
          population: country0.population,
        });
      })
    );
  }

  saveMovie(savedMovie: SaveMovie) {
    return this.http.post(`${environment.jsonServerBase}/movies`, savedMovie);
  }
}
