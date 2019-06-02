import { Component, HostListener, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ScrollService } from '../../services/scroll.service';
import { Country } from '../../models/country';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  minDate = new Date();
  bsRangeValue: Date[];
  countries: Country[];
  selectedCountry: Country;
  selectedCountryString: string;
  adultGuests: number;
  childGuests: number;

  constructor(private countryService: CountryService,
              private scrollService: ScrollService) {  }

  ngOnInit() {
    this.changeMenuColor();
    this.configureDatePicker();
    this.getContries();
    this.getGuests();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e): void {
    this.changeMenuColor();
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedCountry = event.item;
  }

  private changeMenuColor(): void {
    let menu = document.getElementById('menu');
    if (window.pageYOffset > 0) {
      menu.style.backgroundColor = '#121921';
    } else {
        menu.style.backgroundColor = '';
    }
  }

  private configureDatePicker(): void {
    let lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + 10);
    this.bsRangeValue = [new Date(), lastDate];
  }

  private getContries(): any {
    this.countries = this.countryService.getContries();
  }

  private getGuests() {
    this.adultGuests = 2;
    this.childGuests = 0;
  }

  private ScrollToComponent(id: string) {
    this.scrollService.ScrollToOffsetOnly(id);
  }

  private addChild() {
    this.childGuests = this.childGuests + 1;
  }

  private removeChild() {
    this.childGuests = this.childGuests - 1;
  }

  private addAdult() {
    this.adultGuests = this.adultGuests + 1;
  }

  private removeAdult() {
    this.adultGuests = this.adultGuests - 1;
  }
}
