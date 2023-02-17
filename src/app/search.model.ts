export interface Movie {
  Title: string;
  Released: number;
  Actors: string;
  Countries: string[];
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
