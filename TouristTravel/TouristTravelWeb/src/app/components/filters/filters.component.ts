import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { TourService } from '../../services/tour.service';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countries: string[];
  minDate = new Date();
  maxDate: Date = null;
  arrivalDate: Date = null;
  departureDate: Date = null;

  constructor(private tourService: TourService,
              private notificationService: NotificationService) {
    this.getContries();
  }

  searchCountries = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.countries
        : this.countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  private getContries(): any {
    this.tourService.getContriesForTrip().subscribe(
      countries => this.countries = countries,
      err => this.notificationService.error(err)
    );
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
}
