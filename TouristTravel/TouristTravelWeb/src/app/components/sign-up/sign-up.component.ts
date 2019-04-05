import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

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
  public isSignUp: boolean;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private notificationService: NotificationService) {
    this.signUpForm = new FormGroup({
      phone: new FormControl('', [Validators.required, this.userPhoneValidator]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    });
    this.phoneMask = ['+', '3', '8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  }

  signUp(): void {
    const account: AccountSignUp = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      phone: this.signUpForm.value.phone,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword,
      dateOfSignUp: null,
      lastDateOfLogin: null
    };

    this.accountService.signUp(account).subscribe(
      (isSignUp) => {
        if (isSignUp) {
          this.notificationService.success('You have successfully Sign Up!');
          this.cancel();
        } else {
          this.notificationService.error('User with this e-mail is already exsist');
        }
      }, (err) => {
        this.notificationService.error(err);
    });
  }

  editAccount(): void {
  }

  cancel(): void {
    this.activeModal.close();
  }

  public isValid(): boolean {
    if (this.signUpForm.invalid && (
      !this.isFieldValid('firstName') ||
      !this.isFieldValid('lastName') ||
      !this.isFieldValid('phone') ||
      !this.isFieldValid('email') ||
      !this.isFieldValid('password') ||
      !this.isPasswordEqual('password', 'confirmPassword'))) {

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

  private isPasswordEqual(passord: string, cPassword: string) {
    if (this.signUpForm.controls[cPassword].value !== this.signUpForm.controls[passord].value
        && this.signUpForm.controls[cPassword].touched) {
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
