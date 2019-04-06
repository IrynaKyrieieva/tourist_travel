import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { NotificationService } from '../../services/notification.service';
import { AccountService } from '../../services/account.service';
import { PasswordChange } from '../../models/password-change';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  progressRef: NgProgressRef;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private progress: NgProgress) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
  }

  changePassword() {
    this.progressRef.start();
    const changePassword: PasswordChange = {
      accountId: this.accountService.getCookie(environment.accountIdCookie),
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };
    this.accountService.updatePassword(changePassword).subscribe(
      (isUpdate) => {
        if (isUpdate) {
          this.notificationService.success('Your password was changed');
          this.cancel();
        } else {
          this.notificationService.error('Current password is not correct');
        }
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete()
    );
  }

  public isFieldValid(nameField: string): boolean {
    if (this.changePasswordForm.controls[nameField].invalid && this.changePasswordForm.controls[nameField].touched) {
      return false;
    }

    return true;
  }

  private isPasswordEqual(passord: string, cPassword: string) {
    if (this.changePasswordForm.controls[cPassword].value !== this.changePasswordForm.controls[passord].value
        && this.changePasswordForm.controls[cPassword].touched) {
      return false;
    }

    return true;
  }

  cancel(): void {
    this.activeModal.close();
  }

}
