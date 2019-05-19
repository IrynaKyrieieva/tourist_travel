import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { NotificationService } from '../../services/notification.service';
import { Tour } from '../../models/tour';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  progressRef: NgProgressRef;
  tour: Tour;

  constructor(private route: ActivatedRoute,
              private tourService: TourService,
              private notificationService: NotificationService,
              private scrollService: ScrollService,
              private progress: NgProgress) { }

  ngOnInit() {
    this.scrollService.AddMarginForMenu('tourDetails');
    this.progressRef = this.progress.ref('progress-bar');
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.tourService.getTourById(params.id).subscribe(
        (tour) => {
          this.tour = tour;
          alert(this.tour.description);
        },
        (err) => {
          this.notificationService.error(err);
        },
        () => this.progressRef.complete());
    });
  }
}
