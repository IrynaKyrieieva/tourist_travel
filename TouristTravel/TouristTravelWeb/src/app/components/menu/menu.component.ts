import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';
import { ScrollService } from '../../services/scroll.service';
import { AccountProfileComponent } from '../account-profile/account-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements DoCheck, OnInit {
  private accountName: string;
  private isSignIn: boolean;
  private sectionScroll;

  constructor(private modalService: NgbModal,
              private accountService: AccountService,
              private scrollService: ScrollService,
              private router: Router) { }

  ngDoCheck() {
    if (this.accountService.isSignIn()) {
      this.isSignIn = true;
      this.accountName = this.accountService.getCookie(environment.accountNameCookie);
    } else {
      this.isSignIn = false;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.ScrollToComponent();
      this.sectionScroll = null;
    });
  }

  private openSignInComponent(): void {
    this.modalService.open(SignInComponent);
  }

  private openSignUpComponent(): void {
    this.modalService.open(SignUpComponent);
  }

  private openEditComponent(): void {
    this.modalService.open(AccountProfileComponent);
  }

  private openChangePasswordComponent(): void {
    this.modalService.open(ChangePasswordComponent);
  }

  private signOut() {
    this.accountService.deleteCookie(environment.accountNameCookie);
    this.accountService.deleteCookie(environment.accountIdCookie);
  }

  private ScrollToComponent() {
    if (!this.sectionScroll) {
      return;
    }

    try {
      this.scrollService.ScrollToOffsetOnly(this.sectionScroll);
    } finally {
      this.sectionScroll = null;
    }
  }

  private ScrollToComponentById(id: string) {
    this.scrollService.ScrollToOffsetOnly(id);
  }

  private internalRoute(dst) {
    this.sectionScroll = dst;
    this.router.navigate(['/'], {fragment: dst});
}
}
