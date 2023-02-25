import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, map, Observable, of, takeUntil, tap } from 'rxjs';
import { ApiCallsService } from '../api-calls.service';
import { movieExistsValidator } from '../app.validator';
import { addMovie, Country, Genres, MovieType } from '../search.model';

@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss'],
})
export class AddMovieFormComponent {
  form: FormGroup<addMovie> = this.buildForm();
  isSubmitted = false;
  movieType = MovieType;

  get removeBtnDisabled() {
    return this.form.controls.countries.length === 1;
  }

  get addCountriesBtnDisable() {
    return this.form.controls.countries.length === 7;
  }

  countries: string[] = [];

  updateMinutesNumOfSeriesValidation() {
    const minutesControl = this.form.get('minutes');
    const numberOfSeriesControl = this.form.get('numberOfSeries');
    if (this.form.controls?.movieType?.value === 'Movie') {
      minutesControl?.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.min(60),
        Validators.max(190),
      ]);
      numberOfSeriesControl?.clearValidators();
      numberOfSeriesControl?.updateValueAndValidity();
      minutesControl?.updateValueAndValidity();
    } else if (this.form?.controls?.movieType?.value === 'TV-Show') {
      numberOfSeriesControl?.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.min(2),
        Validators.max(1000),
      ]);
      minutesControl?.clearValidators();
      minutesControl?.updateValueAndValidity();
      numberOfSeriesControl?.updateValueAndValidity();
    }
  }

  handleSubmission() {
    this.updateMinutesNumOfSeriesValidation();
    this.isSubmitted = true;
    console.log(this.form.controls.movieType?.value);
  }

  constructor(
    private fb: FormBuilder,
    public apiCallService: ApiCallsService
  ) {}

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  buildForm() {
    return this.fb.group<addMovie>({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      countries: this.fb.array(
        [this.fb.control(null, [Validators.required])],
        [Validators.required]
      ),
      premierPlace: this.fb.control({
        value: '',
        disabled: true,
      }),
      releaseDate: this.fb.control('', [Validators.required]),
      // genre: this.fb.control(Genres.Action),
      movieType: this.fb.control(MovieType.Movie),

      numberOfSeries: this.fb.control(null),
      minutes: this.fb.control(null),
    });
  }

  addCountrySelection() {
    console.log(this.form.controls);
    if (this.form.controls.countries.length <= 7) {
      this.form.controls.countries.push(
        this.fb.control(null, [Validators.required])
      );
    }
  }

  removeCountryControl(index: number) {
    this.form.controls.countries.removeAt(index);
  }

  enablePremierPlace() {
    const countries = this.form?.controls?.countries.value.map(
      (country: string | null) => {
        if (country) {
          return this.apiCallService
            .searchPopulationCurrencyFlagName(country)
            .pipe(
              map((countryInfo) => {
                return countryInfo.population;
              })
            );
        }
        return of(0);
      }
    );

    forkJoin(countries).subscribe((populations) => {
      if (populations.some((population: number) => population < 50000000)) {
        this.form.controls?.premierPlace?.disable();
      } else {
        this.form.controls?.premierPlace?.enable();
      }
    });
  }

  ngOnInit() {
    this.form.controls.name.addAsyncValidators(
      movieExistsValidator(this.apiCallService)
    );
  }
}
