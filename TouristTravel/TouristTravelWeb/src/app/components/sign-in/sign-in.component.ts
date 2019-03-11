import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Account} from '../../models/account';

import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})

export class SignInComponent {
  public signInForm: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private accountService: AccountService) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn(): void {
    if (this.signInForm.valid) {
      this.accountService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe(
        (account) => {
          alert(account.name);
        }, (err) => {
          alert(err);
        });
    } else {
      alert('Form is invalid, check again please');
    }
  }

  private openSignUpComponent(): void {
    this.modalService.open(SignUpComponent);
    this.cancel();
  }

  private cancel(): void {
    this.activeModal.close();
  }
}
