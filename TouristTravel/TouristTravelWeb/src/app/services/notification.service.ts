import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  public defaultError() {
    this.toastr.error('An Error Occurred', 'Please Try Again Later');
  }

  public error(msg: string) {
    this.toastr.error(msg);
  }

  public successWithTitle(title: string, msg: string) {
    this.toastr.success(msg, title);
  }

  public success(msg: string) {
    this.toastr.success(msg);
  }
}
