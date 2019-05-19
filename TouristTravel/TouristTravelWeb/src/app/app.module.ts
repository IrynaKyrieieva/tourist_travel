import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CookieService } from 'ngx-cookie-service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlModule } from 'ngx-owl-carousel';
import { SwiperModule } from 'angular2-useful-swiper';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToursComponent } from './components/tours/tours.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TourCardComponent } from './components/tour-card/tour-card.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';

import { AccountService } from './services/account.service';
import { TourService } from './services/tour.service';
import { NotificationService } from './services/notification.service';
import { NewsletterService } from './services/newsletter.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ModalWindowComponent,
    SignInComponent,
    SignUpComponent,
    FiltersComponent,
    MenuComponent,
    FooterComponent,
    ToursComponent,
    RecommendationComponent,
    AccountProfileComponent,
    ChangePasswordComponent,
    TourCardComponent,
    WishListComponent,
    TourDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TextMaskModule,
    NgxSpinnerModule,
    OwlModule,
    NgProgressModule.withConfig({
      color: '#17a2b8',
      meteor: false,
      thick: true
    }),
    ScrollToModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    AccountService,
    CookieService,
    TourService,
    NotificationService,
    NewsletterService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignInComponent,
    SignUpComponent,
    AccountProfileComponent,
    ChangePasswordComponent
  ]
})
export class AppModule { }
