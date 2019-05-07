import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  tour: Tour = { imageUrl: '1.jpg', title: 'Title', id: 1 };
  
  constructor() { }

  ngOnInit() {
  }

}
