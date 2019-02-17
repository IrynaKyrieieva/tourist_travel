import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignInComponent } from '../sign-in/sign-in.component';
import { AccountService } from '../../services/account.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private modalService: NgbModal,
              private accountService: AccountService) { }

  private openSignInComponent(): void {
    this.modalService.open(SignInComponent);
  }

  private openSignUpComponent(): void {
    this.modalService.open(SignUpComponent);
  }
}
