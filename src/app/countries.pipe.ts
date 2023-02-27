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
  ): string[] {
    if (self) {
      return arr.filter((x: string) => {
        if (x === self) {
          return true;
        }

        if (!used?.includes(x)) {
          return true;
        }

        return false;
      });
    }

    return arr;
  }
}
// {
//   let count = 0;
//   const gur = arr.filter((x: string) => {
//     if (x === self) {
//       return true;
//     }

//     if (used?.includes(x)) {
//       console.log(used?.includes(x));
//       return false;
//     }

//     // console.log(count++);
//     return false;
//   });

//   console.log('sul', used);

//   if (self) {
//     return arr.filter((x: string) => {
//       if (x === self) {
//         return true;
//       }

//       if (!used?.includes(x)) {
//         return true;
//       }

//       return false;
//     });
//   }

//   return arr;
// }
