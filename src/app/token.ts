import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URLS = new InjectionToken<{ [key: string]: string }>(
  'apiUrls',
  {
    providedIn: 'root',
    factory: () => ({
      apiBaseUrlMovies: environment.apiBaseMovies,
      apiUrlCountries: environment.apiBaseCountries,
      apiUrlFlags: environment.apiBaseFlags,
    }),
  }
);
