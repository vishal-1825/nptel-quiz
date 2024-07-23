import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

// this directive is for changing the color of the option chosen by the user, green for correct and red for incorrect
// this directive must be added to the options div.card in question.component.html
// we need to get the value of isCorrect as well in question.component.html

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false;

  constructor(private er: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.er.nativeElement, 'color', 'green');
      this.render.setStyle(this.er.nativeElement, 'border', '2px solid green');
    }
    else {
      this.render.setStyle(this.er.nativeElement, 'color', 'red');
      this.render.setStyle(this.er.nativeElement, 'border', '2px solid red');
    }
  }

}
