import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit, AfterViewInit {
  tour: Tour = {
    imageUrl: '1.jpg',
    // tslint:disable-next-line:max-line-length
    description: 'Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei.',
    title: 'Title',
    id: 1
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const menuHeight = document.getElementById('menu').offsetHeight;
    document.getElementById('filters').style.top = (menuHeight + 7).toLocaleString() + 'px';
  }
}
