import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class TourService {
  private url = environment.apiUrl + '/tour/';
  private readonly countriesUrl = this.url + 'getCountries';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private cookieService: CookieService) { }

  getContriesForTrip(): Observable<string[]> {
    return this.proxyHttpClientService.get(this.countriesUrl);
  }
}
