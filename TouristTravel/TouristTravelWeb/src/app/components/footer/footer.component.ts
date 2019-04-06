import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { NotificationService } from '../../services/notification.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public subscribeForm: FormGroup;
  progressRef: NgProgressRef;

  constructor(private newsletterService: NewsletterService,
              private notificationService: NotificationService,
              private progress: NgProgress) {
    this.subscribeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
  }

  subscribe(): void {
    if (this.subscribeForm.valid) {
      this.progressRef.start();
      this.newsletterService.subscribe(this.subscribeForm.value.email).subscribe(
        (isSubscribe) => {
          if (isSubscribe) {
            this.notificationService.success('Congratulations! When we find something interesting for you, we will send immediately!');
            this.subscribeForm.reset();
          } else {
            this.notificationService.warning('You already have newsletter!');
          }
        },
        (err) => this.notificationService.error(err),
        () => this.progressRef.complete());
    } else {
      this.notificationService.error('E-mail is not correct!');
    }
  }

}
