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
