import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})

export class SignInComponent {
  public signInForm: FormGroup;
  public isErrorSignIn: boolean;

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private accountService: AccountService,
              private notificationService: NotificationService) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn(): void {
    this.accountService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe(
      (account) => {
        if (account.id !== 0) {
          this.isErrorSignIn = false;
          this.accountService.saveToCookie(environment.accountIdCookie, account.id);
          this.accountService.saveToCookie(environment.accountNameCookie, account.firstName);
          this.cancel();
          this.notificationService.success('Successful sign in');
        } else {
          this.isErrorSignIn = true;
          this.notificationService.errorWithTitle('Try again', 'Incorrect credential');
        }
      }, (err) => {
        this.notificationService.error(err);
      });
  }

  private cancel(): void {
    this.activeModal.close();
  }
}
