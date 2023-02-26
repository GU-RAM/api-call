import { Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'api-call';

  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    environmentRating: this.fb.control({ value: 3, disabled: true }),
    serviceRating: this.fb.control(0, [Validators.min(1)]),
    foodRating: this.fb.control(9),
  });

  submit() {
    console.log(this.form.value);
  }

  ngOnInit() {}
}
