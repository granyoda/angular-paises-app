import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './CountryTable.component.html',
  styles: [
    `img{
      width: 30px;
    }`
  ],

  //Cosas de la version 17
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryTableComponent {
  @Input()
  public countries: Country[]= []
 }
