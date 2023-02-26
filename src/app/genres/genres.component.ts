import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Genre } from '../search.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenresComponent),
      multi: true,
    },
  ],
})
export class GenresComponent implements OnInit, ControlValueAccessor {
  @Input() genres: Genre[] = [];

  private _selectedGenres: string[] = [];

  onChange: (genres: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(genres: string[]): void {
    this._selectedGenres = genres || [];
    this.onChange(genres);
  }
  registerOnChange(fn: (genres: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  isSelected(label: string) {
    return this._selectedGenres.includes(label);
  }

  select(label: string) {
    if (!this._selectedGenres.includes(label)) {
      this._selectedGenres.push(label);
      console.log(this._selectedGenres);
    } else {
      this._selectedGenres = this._selectedGenres.filter((x) => x !== label);
      console.log(this._selectedGenres);
    }
    this.onChange(this._selectedGenres);
  }

  constructor() {}

  ngOnInit(): void {}
}
