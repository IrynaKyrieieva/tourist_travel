import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Tour } from '../../models/tour';
import { AccountService } from '../../services/account.service';
import { TourService } from '../../services/tour.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit, DoCheck {
  baseUrl = '../../../assets/images/tours/';
  imageUrl: string;
  description: string;
  isSignIn: boolean;
  @Input() tour: Tour;

  constructor(private accountService: AccountService,
              private tourService: TourService) { }

  ngOnInit() {
    this.imageUrl = this.baseUrl + this.tour.imageUrl;
    if (this.tour.description) {
      this.description = this.tour.description.substring(0, 120) + '...';
    }
  }

  ngDoCheck() {
    this.isSignIn = this.accountService.isSignIn();
  }

  openTour() {
    alert(this.tour.id);
  }

  addToFavourite() {
    if (this.accountService.isSignIn()) {
      const accountId = this.accountService.getCookie(environment.accountIdCookie);
      if (accountId) {
        if (!this.tour.isFavorite) {
          this.tourService.addToFavorite(accountId, this.tour.id);
        } else {
          this.tourService.deleteToFavorite(accountId, this.tour.id);
        }
      }
    }
  }
}
