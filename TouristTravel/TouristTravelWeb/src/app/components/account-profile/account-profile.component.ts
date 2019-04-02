import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent {
  public editForm: FormGroup;
  public phoneMask: Array<string | RegExp>;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private toastr: ToastrService) {
    this.editForm = new FormGroup({
      phone: new FormControl('', [Validators.required, this.userPhoneValidator]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      oldPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    });
    this.phoneMask = ['+', '3', '8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  }

  public isFieldValid(nameField: string): boolean {
    if (this.editForm.controls[nameField].invalid && this.editForm.controls[nameField].touched) {
      return false;
    }

    return true;
  }

  private isPasswordEqual(passord: string, cPassword: string) {
    if (this.editForm.controls[cPassword].value !== this.editForm.controls[passord].value
        && this.editForm.controls[cPassword].touched) {
      return false;
    }

    return true;
  }

  private userPhoneValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.indexOf('_') !== -1) {
      return { userName: true };
    }
    return null;
  }
}
