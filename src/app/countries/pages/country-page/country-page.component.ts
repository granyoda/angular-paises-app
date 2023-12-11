import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country ?: Country;

  constructor(
    private counrieService: CountriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.counrieService.searchCountryByAlphaCode(id)),
      )
      .subscribe( country => {
        /*
        como el resultado de "searchCountryByAlphaCode" ya esta tipado entonces "country" solo trabajará
        con valores de tipo Cpuntry
        */
        //console.log(country)
        if ( !country ) return this.router.navigateByUrl('');

        return this.country = country;
      } )
  }

}
