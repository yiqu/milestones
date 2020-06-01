import { Directive, HostBinding, HostListener, ElementRef, Input } from '@angular/core';
import { CurrencyDisplayPipe } from '../pipes/currency-display.pipe';

@Directive({
  selector: '[currencyDisplay]'
})

export class CurrenyDisplayDirective {

  @HostListener('input' , ['$event'])
  onKeyDown(eve) {
    this.eleRef.nativeElement.value = this.cdp.transform(this.eleRef.nativeElement.value);
  }

  constructor(public eleRef: ElementRef, private cdp: CurrencyDisplayPipe) {

  }
}
