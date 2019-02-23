import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../../services/account.service';
import { AccountSignUp } from '../../models/account-sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public signUpForm: FormGroup;
  public phoneMask: Array<string | RegExp>;
  public isValidName: boolean;
  public isValidPhone: boolean;
  public isValidEmail: boolean;
  public isValidPassword: boolean;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService) {
    this.signUpForm = new FormGroup({
      userPhone: new FormControl('', [Validators.required, this.userPhoneValidator]),
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    });
    this.phoneMask = ['+', '3', '8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      const user: AccountSignUp = {
        name: this.signUpForm.value.userName,
        phone: this.signUpForm.value.userPhone,
        email: this.signUpForm.value.userEmail,
        password: this.signUpForm.value.password,
        dateOfSignUp: null,
        lastDateOfLogin: null
      };

      this.accountService.signUp(user).subscribe(
        (isSignUp) => {
          if (isSignUp) {
            this.cancel();
          } else {
            alert('User with this phone number or e-mail is already exsist');
          }
        }, (err) => {
          alert(err);
        });
    } else {
      alert('Form is invalid, check again please');
    }
  }

  cancel(): void {
    this.activeModal.close();
  }

  public isValid(): boolean {
    if (this.signUpForm.invalid && (
      !this.isFieldValid('userName') ||
      !this.isFieldValid('userPhone') ||
      !this.isFieldValid('userEmail') ||
      !this.isFieldValid('password'))) {

      return false;
    }

    return true;
  }

  public isFieldValid(nameField: string): boolean {
    if (this.signUpForm.controls[nameField].invalid && this.signUpForm.controls[nameField].touched) {
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
