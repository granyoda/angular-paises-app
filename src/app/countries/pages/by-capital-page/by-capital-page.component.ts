import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  searchByCapital( valor : string):void{
    console.log('Desde By capital');
    console.log({ valor });
  }
}
