import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  searchForm: FormGroup;
  minDate = new Date();
  bsRangeValue: Date[];
  countries: string[];
  adultGuests: number;
  childGuests: number;

  constructor(private tourService: TourService,
              private scrollService: ScrollService) {
    this.configureDatePicker();
    this.getContries();
    this.getGuests();
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

  onValueChange(dateRange: Date[]): void {
  }

  private configureDatePicker(): void {
    let lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + 10);
    this.bsRangeValue = [new Date(), lastDate];
  }

  private getContries(): any {
    this.tourService.getContriesForTrip().subscribe(
      countries => this.countries = countries,
      err => alert(err)
    );
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
