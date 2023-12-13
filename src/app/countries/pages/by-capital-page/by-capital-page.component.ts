import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  constructor( private countriesService: CountriesService ){}


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( valor : string):void{
    this.isLoading = true;
    this.countriesService.searchCapital( valor )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading= false;
      });

  }
}
