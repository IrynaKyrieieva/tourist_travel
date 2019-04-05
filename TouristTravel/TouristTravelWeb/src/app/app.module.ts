import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CookieService } from 'ngx-cookie-service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

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
import { TripComponent } from './components/trip/trip.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { AccountService } from './services/account.service';
import { TourService } from './services/tour.service';
import { NotificationService } from './services/notification.service';

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
    TripComponent,
    AccountProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TextMaskModule,
    ScrollToModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    AccountService,
    CookieService,
    TourService,
    NotificationService
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
