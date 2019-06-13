import { Component, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Country } from '../../models/country';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { CountryService } from '../../services/country.service';
import { TourService } from '../../services/tour.service';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  countries: Country[];
  selectedCountry: Country;
  selectedCountryString: string;
  minDate = new Date();
  maxDate: Date = null;
  arrivalDate = new Date();
  departureDate = new Date();
  adult = 2;
  children = 0;
  minPrice = 0;
  maxPrice = 0;

  @Output() onFilterChanged = new EventEmitter<Filters>();

  constructor(private countryService: CountryService,
              private tourService: TourService,
              private notificationService: NotificationService) {
    this.getContries();
    this.departureDate.setDate(this.departureDate.getDate() + 10);
    this.tourService.maxPrice().subscribe(
      (price) => this.maxPrice = price
    );
  }

  searchTours() {
    let filter = new Filters();
    filter.adult = this.adult;
    filter.children = this.children;
    filter.aDate = this.arrivalDate;
    filter.dDate = this.departureDate;
    filter.minPrice = this.minPrice;
    filter.maxPrice = this.maxPrice;
    filter.countryId = this.selectedCountry ? this.selectedCountry.id : 0;

    this.onFilterChanged.emit(filter);
  }

  private getContries(): any {
    this.countries = this.countryService.getContries();
  }

  onArrivalValueChange(date: Date): void {
    this.arrivalDate = date;

    if (this.departureDate < date && this.departureDate != null) {
      this.departureDate.setDate(date.getDate() + 1);
    }
  }

  onDepartureValueChange(date: Date): void {
    this.departureDate = date;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedCountry = event.item;
  }

  addChildren() {
    if (this.children < 10) {
      this.children = this.children + 1;
    }
  }

  removeChildren() {
    if (this.children > 0) {
      this.children = this.children - 1;
    }
  }

  addAdult() {
    if (this.adult < 10) {
      this.adult = this.adult + 1;
    }
  }

  removeAdult() {
    if (this.adult > 1) {
      this.adult = this.adult - 1;
    }
  }
}
