import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ScrollService } from '../../services/scroll.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { TourService } from '../../services/tour.service';
import { NotificationService } from '../../services/notification.service';
import { Tour } from '../../models/tour';
import { environment } from '../../../environments/environment';

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
    this.scrollService.AddMarginForMenu('tourDetails');
    this.progressRef = this.progress.ref('progress-bar');
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.tourService.getTourById(params.id).subscribe(
        (tour) => {
          this.tour = tour;
          this.dateIn = new Date(this.tour.dateIn).toDateString();
          this.dateOut = new Date(this.tour.dateOut).toDateString();
          this.initGallery();
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
    this.galleryImages = [];
    this.galleryImages.push(this.fillImageItem(this.tour.defaultImageUrl));
    this.tour.photos.forEach(x => this.galleryImages.push(
      this.fillImageItem(x)
    ));
  }

  private fillImageItem(url: string): any {
    const urlPath = environment.photoFolder + this.tour.tourId + '/';
    return {
      small: urlPath + url,
      medium: urlPath + url,
      big: urlPath + url
    };
  }
}
