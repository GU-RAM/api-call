import { Pipe, PipeTransform } from '@angular/core';
import { async } from '@angular/core/testing';
import { map, Observable } from 'rxjs';
import { ApiCallsService } from './api-calls.service';
import { Country } from './search.model';

@Pipe({
  name: 'allCountries',
})
export class CountriesPipe implements PipeTransform {
  constructor(public apiCallService: ApiCallsService) {}

  // countries: string[] = [];

  // getCountries() {
  //   this.apiCallService
  //     .getAllCountries()
  //     .pipe(
  //       map((allCountries: Country[]) => {
  //         const countryNamesArray = allCountries.map((country) => {
  //           return country.name.common;
  //         });

  //         return countryNamesArray;
  //       })
  //     )
  //     .subscribe((countries) => (this.countries = countries));
  // }
  // countries: Observable<string[]> = this.apiCallService.getAllCountries().pipe(
  //   map((allCountries: Country[]) => {
  //     const countryNamesArray = allCountries.map((country) => {
  //       return country.name.common;
  //     });

  //     return countryNamesArray;
  //   })
  // )

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

        return countryNamesArray.filter(
          (x) => !used?.includes(x) && self !== x
        );
      })
    );
  }
}
