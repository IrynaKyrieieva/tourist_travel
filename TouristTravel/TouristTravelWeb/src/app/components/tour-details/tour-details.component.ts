import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ScrollService } from '../../services/scroll.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { TourService } from '../../services/tour.service';
import { NotificationService } from '../../services/notification.service';
import { Tour } from '../../models/tour';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  progressRef: NgProgressRef;
  tour: Tour;
  dateOut: string;
  dateIn: string;

  constructor(private route: ActivatedRoute,
              private tourService: TourService,
              private notificationService: NotificationService,
              private scrollService: ScrollService,
              private progress: NgProgress) { }

  ngOnInit() {
    this.initGallery();
    this.scrollService.AddMarginForMenu('tourDetails');
    this.progressRef = this.progress.ref('progress-bar');
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.tourService.getTourById(params.id).subscribe(
        (tour) => {
          this.tour = tour;
          this.dateIn = new Date(this.tour.dateIn).toDateString();
          this.dateOut = new Date(this.tour.dateOut).toDateString();
        },
        (err) => {
          this.notificationService.error(err);
        },
        () => this.progressRef.complete());
    });
  }

  private initGallery() {
    this.galleryOptions = [
      {
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        imageAutoPlayInterval: 8000,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        imageInfinityMove: true,
        previewCloseOnClick: true,
        width: '100%'
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 3
      },
      {
        breakpoint: 500,
        width: '100%',
        height: '200px',
        thumbnailsColumns: 2
      },
    ];

    const array = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg', 'assets/1.jpg', 'assets/3.jpg'];

    this.galleryImages = [];
    array.forEach(x => this.galleryImages.push(this.fillImageItem(x)));
  }

  private fillImageItem(url: string): any {
    return {
      small: url,
      medium: url,
      big: url
    };
  }
}
