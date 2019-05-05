import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements AfterViewInit {
  imageUrl: string;
  description: string;
  title: string;

  constructor() {
    this.imageUrl = '1.jpg';
    this.description = 'Something';
  }

  ngAfterViewInit() {
    const menuHeight = document.getElementById('menu').offsetHeight;
    document.getElementById('filters').style.top = (menuHeight + 7).toLocaleString() + 'px';
  }
}
