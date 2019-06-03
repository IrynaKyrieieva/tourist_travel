import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Country } from '../../models/country';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { CountryService } from '../../services/country.service';

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
  arrivalDate: Date = null;
  departureDate: Date = null;

  constructor(private countryService: CountryService,
              private notificationService: NotificationService) {
    this.getContries();
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
}
