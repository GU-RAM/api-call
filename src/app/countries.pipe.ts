import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiCallsService } from './api-calls.service';
import { Country } from './search.model';

@Pipe({
  name: 'allCountries',
})
export class CountriesPipe implements PipeTransform {
  constructor(public apiCallService: ApiCallsService) {}

  transform(
    arr: any,
    used: (string | null)[] | undefined,
    self: string | null
  ): Observable<string[]> {
    return this.apiCallService.getAllCountries().pipe(
      map((allCountries: Country[]) => {
        const countryNamesArray = allCountries.map((country) => {
          return country.name.common;
        });

        return countryNamesArray.filter((x) => {
          if (x === self) {
            return true;
          }

          if (!used?.includes(x)) {
            return true;
          }

          return false;
        });
      })
    );
  }
}
