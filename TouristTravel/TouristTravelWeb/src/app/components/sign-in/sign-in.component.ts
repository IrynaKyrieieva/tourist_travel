import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})

export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public isErrorSignIn: boolean;
  progressRef: NgProgressRef;

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private progress: NgProgress) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
  }

  signIn(): void {
    this.accountService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe(
      (account) => {
        if (account.id !== 0) {
          this.isErrorSignIn = false;
          this.accountService.saveToCookie(environment.accountIdCookie, account.id);
          this.accountService.saveToCookie(environment.accountNameCookie, account.firstName);
          this.notificationService.success('Successful sign in');
          this.cancel();
        } else {
          this.isErrorSignIn = true;
          this.notificationService.error('Incorrect credential');
        }
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
  }

  private cancel(): void {
    this.activeModal.close();
  }
}
