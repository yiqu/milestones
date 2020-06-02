import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();

  constructor(private router: Router, private route: ActivatedRoute, private ts: ToasterService) {

  }

  ngOnInit() {

  }

  onAddMilestone() {
    const ts: number = new Date().getTime();
    this.router.navigate(['./', 'add'], {
      relativeTo: this.route,
      queryParams: {time: ts}
    });
  }

  onEditMilestone() {
    this.router.navigate(['./', 'edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.ts.clearAll();
  }
}
