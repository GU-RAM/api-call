import { FormArray, FormControl } from '@angular/forms';

export interface Movie {
  Country: string;
  Title: string;
  Released: number;
  Actors: string;
  Countries: string[];
  Poster: string;
  CountryInfo: Country[];
  Comment: string;
  id: string | number;
}

export interface Country {
  name: Name;
  currencies: Currency;
  flags: Flags;
  population: number;
}

interface Name {
  common: string;
}
export interface Currency {
  [key: string]: { name: string; symbol: string };
}

interface Flags {
  png: string;
}

export interface RunTime {
  RunTime: string;
}

export enum MovieType {
  Movie = 'Movie',
  TVShow = 'TV-Show',
}

export enum Genres {
  Comedy = 'Comedy',
  Action = 'Action',
  Thriller = 'Thriller',
  Drama = 'Drama',
  Romance = 'Romance',
}

export interface addMovie {
  name: FormControl<string | null>;
  countries: FormArray<FormControl<null>>;
  premierPlace?: FormControl<string | null>;
  releaseDate: FormControl<string | null>;
  // genre: FormControl<Genres | null>;
  movieType?: FormControl<MovieType | null>;
  numberOfSeries?: FormControl<MovieType.TVShow | null>;
  minutes: FormControl<number | null>;
  // rating: FormControl<string | null>;
}
