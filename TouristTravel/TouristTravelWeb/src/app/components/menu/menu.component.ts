import { Component, HostListener, Inject  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private modalService: NgbModal) { }

  private openSignInComponent(): void {
  this.modalService.open(SignInComponent);
  }

  private openSignUpComponent(): void {
  this.modalService.open(SignUpComponent);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
      var menu = document.getElementById('menu');
      if (window.pageYOffset > 0) {
        menu.classList.add('sticky');
      } else {
          menu.classList.remove('sticky');
      }
  }
}
