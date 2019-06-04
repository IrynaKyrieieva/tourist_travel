import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Tour } from '../models/tour';
import { Country } from '../models/country';
import { AccountService } from './account.service';

@Injectable()
export class TourService {
  private url = environment.apiUrl + '/tour/';
  private readonly addToFavoritesUrl = this.url + 'addToFavorites';
  private readonly deleteToFavouriteUrl = this.url + 'deleteFromFavorite';
  private readonly getTourByIdUrl = this.url + 'getTourById';
  private readonly getWishListUrl = this.url + 'getWishList';
  private readonly getToursUrl = this.url + 'getTours';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private accountService: AccountService) { }

  getTours(): Observable<Tour[]> {
    const params = new HttpParams().set('accountId', this.accountService.getCookie(environment.accountIdCookie));
    return this.proxyHttpClientService.get(this.getToursUrl, params);
  }

  addToFavorite(tourId: number): Observable<boolean> {
    const accountId = this.accountService.tryGetCookie(environment.accountIdCookie);
    const params = new HttpParams()
      .set('accountId', accountId.toLocaleString())
      .set('tourId', tourId.toLocaleString());

    return this.proxyHttpClientService.get(this.addToFavoritesUrl, params);
  }

  deleteToFavorite(tourId: number): Observable<boolean> {
    const accountId = this.accountService.tryGetCookie(environment.accountIdCookie);
    const params = new HttpParams()
      .set('accountId', accountId.toLocaleString())
      .set('tourId', tourId.toLocaleString());

    return this.proxyHttpClientService.get(this.deleteToFavouriteUrl, params);
  }

  getTourById(tourId: number): Observable<Tour> {
    const params = new HttpParams().set('tourId', tourId.toLocaleString());

    return this.proxyHttpClientService.get(this.getTourByIdUrl, params);
  }

  getWishList(): Observable<Tour[]> {
    const accountId = this.accountService.tryGetCookie(environment.accountIdCookie);
    if (accountId) {
      const params = new HttpParams().set('accountId', accountId.toLocaleString());
      return this.proxyHttpClientService.get(this.getWishListUrl, params);
    } else {

    }
  }
}
