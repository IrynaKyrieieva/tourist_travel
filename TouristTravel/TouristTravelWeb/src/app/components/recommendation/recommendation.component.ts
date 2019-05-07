import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  tour: Tour = { imageUrl: '1.jpg', title: 'Title', id: 1 };

  config: SwiperOptions = {
    slidesPerView: 3,
    loop: true
  };

  constructor() { }

  ngOnInit() {
  }

}
