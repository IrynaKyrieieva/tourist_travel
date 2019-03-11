import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public subscribeForm: FormGroup;

  constructor(private newsletterService: NewsletterService) {
    this.subscribeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  subscribe(): void {
    if (this.subscribeForm.valid) {
      this.newsletterService.subscribe(this.subscribeForm.value.email).subscribe(
        (isSubscribe) => {
          if (isSubscribe) {
            alert('Congratulations! When we find something interesting for you, we will send immediately!');
          } else {
            alert('You already have newsletter!');
          }
          this.subscribeForm.reset();
        }, (err) => {
          alert(err);
        });
    } else {
      alert('Please, write your e-mail!');
    }
  }

}
