import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private ts: ToastrService) {

  }

  getSuccess(msg: string, duration?: number) {
    this.ts.success(msg, "Success!");
  }

  getError(msg: string) {
    this.ts.error(msg, "Error occured!");
  }

  getInfo(msg: string) {
    this.ts.info(msg, "Info.");
  }

  getSuccessAndClear(msg: string, duration?: number) {
    this.clearAll();
    this.ts.success(msg, "Success!");
  }

  clearAll() {
    this.ts.clear();
  }

}
