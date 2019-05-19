import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';
import { TourService } from '../../services/tour.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { NotificationService } from '../../services/notification.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  tours: Tour[];
  progressRef: NgProgressRef;

  constructor(private tourService: TourService,
              private notificationService: NotificationService,
              private scrollService: ScrollService,
              private progress: NgProgress) { }

  ngOnInit() {
    this.scrollService.AddMarginForMenu('wishList');
    this.progressRef = this.progress.ref('progress-bar');
    this.progressRef.start();
    this.tourService.getWishList().subscribe(
      (tours) => {
        tours.forEach(x => x.imageUrl = '1.jpg');
        this.tours = tours;
      },
      (err) => this.notificationService.error(err),
      () => this.progressRef.complete());
  }

  deleteTour(id: number) {
    const tourIds = this.tours.map(x => x.id);
    const tourIndex = tourIds.indexOf(id);
    this.tours.splice(tourIndex, 1);
  }
}
