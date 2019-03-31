import { Component, HostListener, DoCheck  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrService } from 'ngx-toastr';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements DoCheck {
  private accountName: string;
  private isSignIn: boolean;

  constructor(private modalService: NgbModal,
              private accountService: AccountService,
              private scrollService: ScrollService) { }

  ngDoCheck() {
    if (this.accountService.checkCookie(environment.accountIdCookie)) {
      this.isSignIn = true;
      this.accountName = this.accountService.getCookie(environment.accountNameCookie);
    } else {
      this.isSignIn = false;
    }
  }

  private openSignInComponent(): void {
    this.modalService.open(SignInComponent);
  }

  private openSignUpComponent(): void {
    this.modalService.open(SignUpComponent);
  }

  private openEditComponent(): void {
    this.modalService.open(SignUpComponent);
  }

  private openWishList(): void {
    alert('Wish List');
  }

  private signOut() {
    this.accountService.deleteCookie(environment.accountNameCookie);
    this.accountService.deleteCookie(environment.accountIdCookie);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e): void {
      var menu = document.getElementById('menu');
      if (window.pageYOffset > 0) {
        menu.classList.add('sticky');
      } else {
          menu.classList.remove('sticky');
      }
  }

  private ScrollToComponent(id: string) {
    this.scrollService.ScrollToOffsetOnly(id);
  }
}
