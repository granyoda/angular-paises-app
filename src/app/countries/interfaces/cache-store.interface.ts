import { Country } from "./country";
import { Region } from "./region.type";


export interface CacheStore {
  byCapital   : TermCoountries;
  byCountries : TermCoountries;
  byRegion    : RegionCoountries
}

export interface TermCoountries {
  term: string;
  countries: Country[];
}

export interface RegionCoountries {
  region: Region;
  countries: Country[];
}
