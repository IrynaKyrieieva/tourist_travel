import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { AccountService } from '../../services/account.service';
import { NotificationService } from '../../services/notification.service';
import { Account } from '../../models/account';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  public editForm: FormGroup;
  public phoneMask: Array<string | RegExp>;
  private isChangePassword: boolean;
  private accountProfile: Account;
  progressRef: NgProgressRef;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private progress: NgProgress) {
    this.isChangePassword = false;
    this.editForm = new FormGroup({
      phone: new FormControl('', [Validators.required, this.userPhoneValidator]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.phoneMask = ['+', '3', '8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
    if (this.accountService.checkCookie(environment.accountIdCookie)) {
      this.getAccount();
    } else {
      this.notificationService.defaultError();
    }
  }

  public isFieldValid(nameField: string): boolean {
    if (this.editForm.controls[nameField].invalid && this.editForm.controls[nameField].touched) {
      return false;
    }

    return true;
  }

  private getAccount(): void {
    this.progressRef.start();
    this.accountService.getAccount().subscribe(
      (account) => {
        this.editForm.controls.phone.setValue(account.phone);
        this.editForm.controls.firstName.setValue(account.firstName);
        this.editForm.controls.lastName.setValue(account.lastName);
        this.editForm.controls.email.setValue(account.email);
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
  }

  private updateAccount() {
    this.progressRef.start();
    const account: Account = {
      id: this.accountService.getCookie(environment.accountIdCookie),
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      phone: this.editForm.value.phone,
      email: this.editForm.value.email
    };
    this.accountService.updateAccount(account).subscribe(
      (isUpdate) => {
        if (isUpdate) {
          this.accountService.saveToCookie(environment.accountNameCookie, account.firstName);
          this.notificationService.success('Your personal data is update');
          this.cancel();
        } else {
          this.notificationService.defaultError();
        }
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
  }

  private userPhoneValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.indexOf('_') !== -1) {
      return { userName: true };
    }
    return null;
  }

  cancel(): void {
    this.activeModal.close();
  }
}
