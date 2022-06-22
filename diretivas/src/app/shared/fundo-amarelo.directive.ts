import { Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  // selector: '[fundoAmarelo]'
  selector: 'p[fundoAmarelo]' // quando quer aplicar apenas em um elemento
})
export class FundoAmareloDirective {


  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    console.log(this._elementRef);
    //this._elementRef.nativeElement.style.backgroundColor="yellow"; evitar por segurança
      this._renderer.setStyle(this._elementRef.nativeElement, "backgroundColor", "yellow");

   }


}
