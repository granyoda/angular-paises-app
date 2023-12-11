import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of,  } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: String = "https://restcountries.com/v3.1";

  constructor(private httpClient: HttpClient) { }


  searchCapital(term: string): Observable<Country[]> {
    const url =`${ this.apiUrl }/capital/${ term }`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        /*
        en caso de que la busqueda de error (no encuentre el valor requerido) se va atrapar y devolver
        un arreglo vacio
        */
        catchError( () => {
        //catchError( error => {
          //console.log(error);
          return of([]);
        } )
      );
  }


  searchCountry(term: string): Observable<Country[]> {
    const url =`${ this.apiUrl }/name/${ term }`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        /*lo mismo de arriba*/
        catchError( () => {
          return of([]);
        } )
      );
  }

  searchRegion(region: string): Observable<Country[]> {

    const url =`${ this.apiUrl }/region/${ region }`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        /*lo mismo de arriba*/
        catchError( () => {
          return of([]);
        } )
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
