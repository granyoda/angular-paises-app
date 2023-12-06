import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {

  @Input()
  public placeholder: String ='';

  @Output()
  public onValue = new EventEmitter<string>()

  mostrarValor( value: string ):void {
    this.onValue.emit( value );
  }

}
