import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
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
  // countries$: Observable<string[]> | undefined;

  get removeBtnDisabled() {
    return this.form.controls.countries.length === 1;
  }

  get addCountriesBtnDisable() {
    return this.form.controls.countries.length === 7;
  }

  countries = [];

  handleSubmission() {
    this.isSubmitted = true;
    console.log(this.form.value);
  }

  constructor(
    private fb: FormBuilder,
    public apiCallService: ApiCallsService
  ) {}

  buildForm() {
    return this.fb.group<addMovie>({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      countries: this.fb.array([this.fb.control(null)]),
      // premierPlace: this.fb.control(''),
      // releaseDate: this.fb.control(''),
      // genre: this.fb.control(Genres.Action),
      // movieType: this.fb.control(MovieType.Movie),
      // numberOfSeries: this.fb.control(null),
      // minutes: this.fb.control(null),
    });
  }

  addCountrySelection() {
    console.log(this.form.controls);
    if (this.form.controls.countries.length <= 7) {
      this.form.controls.countries.push(this.fb.control(null));
    }
  }

  removeHobbyControl(index: number) {
    this.form.controls.countries.removeAt(index);
  }

  ngOnInit() {
    this.form.controls.name.addAsyncValidators(
      movieExistsValidator(this.apiCallService)
    );
  }
}
