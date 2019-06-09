import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { AccountService } from '../../services/account.service';
import { NotificationService } from '../../services/notification.service';
import { Account } from '../../models/account';
import { environment } from '../../../environments/environment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

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
  public selectedCountry: Country;
  public countries: Country[];
  public maxBday: Date;

  constructor(private activeModal: NgbActiveModal,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private progress: NgProgress,
              private countryService: CountryService) {
    this.isChangePassword = false;
    this.editForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl(''),
      gender: new FormControl(''),
      country: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
    this.maxBday = new Date();
    this.countries = this.countryService.getContries();
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
        this.editForm.controls.firstName.setValue(account.firstName);
        this.editForm.controls.lastName.setValue(account.lastName);
        this.editForm.controls.email.setValue(account.email);
        this.editForm.controls.gender.setValue(account.gender);
        if (account.birthday != null) {
          this.editForm.controls.birthday.setValue(new Date(account.birthday));
        }
        this.selectedCountry = this.countryService.getById(account.countryId);
        this.editForm.controls.country.setValue(this.selectedCountry.name);
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
  }

  private updateAccount() {
    const account: Account = {
      id: this.accountService.getCookie(environment.accountIdCookie),
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      email: this.editForm.value.email,
      countryId: this.selectedCountry.id,
      birthday: new Date(this.editForm.value.birthday).toLocaleString('en-US'),
      gender: this.editForm.value.gender
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
      (err) => this.notificationService.error(err));
  }

  cancel(): void {
    this.activeModal.close();
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedCountry = event.item;
  }
}
