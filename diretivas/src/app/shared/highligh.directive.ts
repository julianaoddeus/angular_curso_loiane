import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    this.backgroundColor = 'yellow';
  }


  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = 'white';
  }

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  @Input() defaultColor: string= 'white';
  @Input('highlight') highlightColor : string = ' yellow';

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

}
