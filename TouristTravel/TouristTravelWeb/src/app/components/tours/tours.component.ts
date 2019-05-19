import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';
import {TourService} from '../../services/tour.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit, AfterViewInit {
  tours: Tour[];

  constructor(private tourService: TourService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.tourService.getTours().subscribe(
      (tours) => {
        tours.forEach(x => x.imageUrl = '1.jpg');
        this.tours = tours;
      },
      (err) => this.notificationService.error(err)
    );
  }

  ngAfterViewInit() {
    const menuHeight = document.getElementById('menu').offsetHeight;
    document.getElementById('filters').style.top = (menuHeight + 7).toLocaleString() + 'px';
  }
}
