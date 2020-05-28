import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class AccountEditComponent implements OnInit {

  updateSubText: string = "Update my profile";


  constructor() { }

  ngOnInit() { }
}
