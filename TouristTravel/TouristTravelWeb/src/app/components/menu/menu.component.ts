import { Component, HostListener, DoCheck  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrService } from 'ngx-toastr';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements DoCheck {
  private accountName: string;
  private isSignIn: boolean;

  constructor(private modalService: NgbModal,
              private scrollToService: ScrollToService,
              private toastr: ToastrService,
              private accountService: AccountService) { }

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

  public ScrollToOffsetOnly(id: string) {
    const menuHeight = document.getElementById('menu').offsetHeight;
    const config: ScrollToConfigOptions = {
      offset: -1 * menuHeight,
      target: id
    };
    this.scrollToService.scrollTo(config);
  }
}
