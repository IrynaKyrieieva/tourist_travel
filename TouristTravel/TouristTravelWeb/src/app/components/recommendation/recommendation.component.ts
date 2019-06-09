import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  tours: Tour[];

  config: SwiperOptions = {
    slidesPerView: 3,
    loop: true
  };

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tourService.getTours().subscribe(
      (tours) => {
        tours.forEach(x => x.imageUrl = x.id + '.jpg');
        this.tours = tours;
      });
  }

}
