import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-empty',
  templateUrl: 'empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class PersonalEmptyComponent implements OnInit {

  title: string = "You have not entered any Milestones yet.";
  subtitle: string = "Start adding Milestones to keep track of your progress.";

  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  goAddNew() {
    this.router.navigate(['/', 'personal', 'add']);
  }
}
