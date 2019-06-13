import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { Observable } from '../../../node_modules/rxjs';
import { Country } from '../models/country';
import { NotificationService } from './notification.service';
import { compileDirective } from '../../../node_modules/@angular/core/src/render3/jit/directive';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = environment.apiUrl + '/country/';
  private readonly countriesUrl = this.url + 'getCountries';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private notificationService: NotificationService) { }

  getContries(): Country[] {
    let countries = this.getCountriesFromLocalStorage();
    if (!countries) {
      this.proxyHttpClientService.get(this.countriesUrl).subscribe(
        (countriesInfo) => {
          countriesInfo.unshift({id: 0, name: 'All Countries'});
          localStorage.setItem(environment.countriesInfo, JSON.stringify(countriesInfo));
          countries = this.getCountriesFromLocalStorage();
        },
        err => this.notificationService.error(err)
      );
    }

    return countries;
  }

  getById(id: number): Country {
    let country = this.getContries().filter(x => x.id == id);

    return country[0];
  }

  private getCountriesFromLocalStorage() {
    let countries = localStorage.getItem(environment.countriesInfo);
    if (countries) {
      return JSON.parse(countries);
    }

    return null;
  }
}
