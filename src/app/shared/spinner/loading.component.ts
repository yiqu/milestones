import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: 'loading.component.html'
})

export class LoadingSpinnerComponent implements OnInit {

  @Input()
  colorPalette: ThemePalette = "primary";

  @Input()
  diameter: number = 55;


  constructor() {

  }

  ngOnInit() { }
}
