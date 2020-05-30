import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();

  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
