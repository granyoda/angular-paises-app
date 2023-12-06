import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ){}

  searchByCapital( valor : string):void{
    this.countriesService.searchCapital( valor )
      .subscribe( countries => {
        this.countries = countries;
      })
  }
}
