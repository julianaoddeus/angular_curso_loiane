import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    // this._renderer.setStyle(this._element.nativeElement, 'background-color', 'yellow')
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = 'white';
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = '';
  constructor() { }

}
