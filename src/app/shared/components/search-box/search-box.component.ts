import { Component, EventEmitter, Input, OnDestroy, OnInit, Output,  } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription? : Subscription;

  @Input()
  public placeholder: String ='';

  @Input()
  public initialValue: String ='';

  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()

  /*
  lo que hace aqui es implementar un "temporalizador" cuando el usuario ya no esta escribiendo
  en un lapso de tiempo (el que toma el tiempo es el debounceTimer)
  */
 ngOnInit(): void {
   this.debouncerSuscription = this.debouncer
   .pipe(
     debounceTime(500)
    )
    .subscribe( value => {
      //console.log("debouncer valor: ", value)
     this.onDebounce.emit( value )
    } )
  }

  //este metodo elimina las subscribe que se hagan ya que no se eliminan automaticamente
  // esot se hace con la finalidad de desperdicar memoria
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  mostrarValor( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next(searchTerm);
  }
}
