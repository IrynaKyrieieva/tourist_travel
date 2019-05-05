import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {
  baseUrl = '../../../assets/images/tours/';
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;

  ngOnInit() {
    this.imageUrl = this.baseUrl + this.imageUrl;
  }

}
