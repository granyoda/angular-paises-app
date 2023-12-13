import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap,  } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: String = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {
    byCapital:    { term: '', countries: [] },
    byCountries:  { term: '', countries: [] },
    byRegion:     { region: '', countries: [] }
  }

  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStorage' ,JSON.stringify( this.cacheStore ) );
  }
  private loadToLocalStorage(){
    if( !localStorage.getItem( 'cacheStorage' ) ) return;

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStorage' )! );
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      /*
      en caso de que la busqueda de error (no encuentre el valor requerido) se va atrapar y devolver
      un arreglo vacio
      */
      catchError( () => of([])),
      /*{
        catchError( error => {
          console.log(error);
          return of([]);

        }*/
      //delay( 2000 ),
    );
  }


  searchCapital(term: string): Observable<Country[]> {
    const url =`${ this.apiUrl }/capital/${ term }`;

    return this.getCountriesRequest(url)
    .pipe(
      //tap( countries => this.cacheStore.byCapital = { term: term, countries: countries } )
      //Para no ser redundante en la asignacion de valores en EmA Script 6 se puede colocar de la siguiente manera
      tap( countries => this.cacheStore.byCapital = { term, countries } ),
      tap( () => this.saveToLocalStorage() ),
    );
  }


  searchCountry(term: string): Observable<Country[]> {
    const url =`${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url).pipe(
      //tap( countries => this.cacheStore.byCapital = { term: term, countries: countries } )
      //Para no ser redundante en la asignacion de valores en EmA Script 6 se puede colocar de la siguiente manera
      tap( countries => this.cacheStore.byCountries = { term, countries } ),
      tap( () => this.saveToLocalStorage() ),
    );
  }

  searchRegion(region: Region): Observable<Country[]> {

    const url =`${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url).pipe(
      //tap( countries => this.cacheStore.byCapital = { term: term, countries: countries } )
      //Para no ser redundante en la asignacion de valores en EmA Script 6 se puede colocar de la siguiente manera
      tap( countries => this.cacheStore.byRegion = { region, countries } ),
      tap( () => this.saveToLocalStorage() ),
    );

  }



  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    /*se regresa un valor o nulo ya que se tipa para trabajar con un valor pero el Observable trabaja con
    un arreglo de valores entonces para solucionar esto se mapea y devuelve el primer valor del arreglo o un nulo
    en caso de no haber nada
    NOTA: si poner el mouse sobre el countries de map marcará el tipo de dato que será de tipo Country
    */
    const url =`${ this.apiUrl }/alpha/${ code }`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of(null) )
      );

  }
}
