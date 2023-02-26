import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  private _stars: unknown[] = Array(5);

  get stars() {
    return this._stars;
  }

  @Input() set maxRating(value: number) {
    this._stars = Array(value);
  }

  private _hoverIndex = -1;

  @Input() rating = 0;

  disabled = false;

  onChange: (rating: number) => void = () => {};
  onTouched: (rating: number) => void = () => {};

  constructor() {}

  writeValue(rating: any): void {
    this.rating = rating;
    this.onChange(rating);
  }
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (rating: number) => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  enter(index: number) {
    if (this.disabled) {
      return;
    }
    this._hoverIndex = index;
  }

  leave() {
    this._hoverIndex = -1;
  }

  select(index: number) {
    if (this.disabled) {
      return;
    }
    this.rating = index + 1;
    this.onChange(this.rating);
    this.leave();
  }

  getStarClass(index: number) {
    if (index <= this._hoverIndex) {
      return { active: true, hovered: true };
    }

    if (index < this.rating && this._hoverIndex === -1) {
      return {
        active: true,
      };
    }

    return {};
  }

  isHovered(index: number) {
    return this._hoverIndex === index;
  }

  makeDisable() {
    this.disabled = true;
  }

  ngOnInit() {}
}
