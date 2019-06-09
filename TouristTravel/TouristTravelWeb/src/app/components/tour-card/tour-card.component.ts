import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Tour } from '../../models/tour';
import { AccountService } from '../../services/account.service';
import { TourService } from '../../services/tour.service';
import { NotificationService } from '../../services/notification.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit, DoCheck {
  baseUrl = '../../../assets/images/tours/';
  imageUrl: string;
  description: string;
  dateIn: string;
  dateOut: string;
  isSignIn: boolean;
  price: number;
  progressRef: NgProgressRef;
  @Input() tour: Tour;

  constructor(private accountService: AccountService,
              private tourService: TourService,
              private notificationService: NotificationService,
              private progress: NgProgress) { }

  ngOnInit() {
    this.progressRef = this.progress.ref('progress-bar');
    this.imageUrl = this.baseUrl + this.tour.imageUrl;
    if (this.tour.dateIn) {
      this.dateIn = new Date(this.tour.dateIn).toLocaleDateString();
    }
    if (this.tour.dateOut) {
      this.dateOut = new Date(this.tour.dateOut).toLocaleDateString();
    }
    if (this.tour.price) {
      this.price = this.tour.price;
    }

    if (this.tour.description) {
      this.description = this.tour.description.substring(0, 60) + '...';
    }
  }

  ngDoCheck() {
    this.isSignIn = this.accountService.isSignIn();
  }

  addToFavourite() {
    if (this.accountService.isSignIn()) {
      this.progressRef.start();
      if (!this.tour.isFavorite) {
        this.tourService.addToFavorite(this.tour.id).subscribe(
          (isOk) => {
            this.tour.isFavorite = true;
            this.notificationService.success('Tour is added to favorite');
          },
          (err) => this.notificationService.error(err),
          () => this.progressRef.complete());
      } else {
        this.tourService.deleteToFavorite(this.tour.id).subscribe(
          (isOk) => {
            this.tour.isFavorite = false;
            this.notificationService.success('Tour is deleted from favorite');
          },
        (err) => this.notificationService.error(err),
        () => this.progressRef.complete());
      }
    }
  }
}
