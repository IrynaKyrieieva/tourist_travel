import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

import { AccountService } from '../../services/account.service';
import { AccountSignUp } from '../../models/account-sign-up';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public phoneMask: Array<string | RegExp>;
  public isValidName: boolean;
  public isValidPhone: boolean;
  public isValidEmail: boolean;
  public isValidPassword: boolean;
  public isSignUp: boolean;
  progressRef: NgProgressRef;
  public maxBday: Date;
  public countries: Country[];
  public selectedCountry: Country;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private progress: NgProgress,
              private countryService: CountryService) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
    this.maxBday = new Date();
    this.countries = this.countryService.getContries();
  }

  signUp(): void {
    const account: AccountSignUp = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword,
      countryId: this.selectedCountry.id,
      dateOfSignUp: null,
      lastDateOfLogin: null
    };
    this.progressRef.start();
    this.accountService.signUp(account).subscribe(
      (isSignUp) => {
        if (isSignUp) {
          this.notificationService.success('You have successfully Sign Up!');
          this.cancel();
        } else {
          this.notificationService.error('User with this e-mail is already exsist');
        }
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
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

  onSelect(event: TypeaheadMatch): void {
    this.selectedCountry = event.item;
  }
}
