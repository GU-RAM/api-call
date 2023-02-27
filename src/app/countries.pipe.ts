import { Pipe, PipeTransform } from '@angular/core';
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
  ): string[] {
    if (
      self ||
      (used?.length !== null && used?.length !== undefined && used?.length > 1)
    ) {
      const countriesFiltered = arr.filter((x: string) => {
        if (x === self) {
          return true;
        }

        if (!used?.includes(x)) {
          return true;
        }

        return false;
      });

      return countriesFiltered;
    }

    return arr;
  }
}
