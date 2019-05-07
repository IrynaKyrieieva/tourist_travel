import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TourService {
  private url = environment.apiUrl + '/tour/';
  private readonly countriesUrl = this.url + 'getCountries';
  private readonly addToFavoritesUrl = this.url + 'addToFavorites';
  private readonly deleteToFavouriteUrl = this.url + 'deleteToFavourite';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private cookieService: CookieService) { }

  getContriesForTrip(): Observable<string[]> {
    return this.proxyHttpClientService.get(this.countriesUrl);
  }

  addToFavorite(accountId: number, tourId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('accountId', accountId.toLocaleString())
      .set('tourId', tourId.toLocaleString());

    return this.proxyHttpClientService.get(this.addToFavoritesUrl, params);
  }

  deleteToFavorite(accountId: number, tourId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('accountId', accountId.toLocaleString())
      .set('tourId', tourId.toLocaleString());

    return this.proxyHttpClientService.get(this.deleteToFavouriteUrl, params);
  }
}
