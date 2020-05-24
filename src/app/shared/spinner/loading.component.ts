import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: 'loading.component.html'
})

export class LoadingSpinnerComponent implements OnInit {

  @Input()
  colorPalette: string = "primary";

  @Input()
  diameter: number = 55;


  constructor() {

  }

  ngOnInit() { }
}
