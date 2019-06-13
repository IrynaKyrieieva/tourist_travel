import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Tour } from '../models/tour';
import { Country } from '../models/country';
import { AccountService } from './account.service';
import { Filters } from '../models/filters';

@Injectable()
export class TourService {
  private url = environment.apiUrl + '/tour/';
  private readonly addToFavoritesUrl = this.url + 'addToFavorites';
  private readonly deleteToFavouriteUrl = this.url + 'deleteFromFavorite';
  private readonly getTourByIdUrl = this.url + 'getTourById';
  private readonly getWishListUrl = this.url + 'getWishList';
  private readonly getToursUrl = this.url + 'getTours';
  private readonly getMaxPrice = this.url + 'getMaxPrice';
  private readonly getToursByFiltersUrl = this.url + 'getToursByFilter';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private accountService: AccountService) { }

  getTours(): Observable<Tour[]> {
    let params = new HttpParams();
    if (this.accountService.checkCookie(environment.accountIdCookie)) {
      params = new HttpParams().set('accountId', this.accountService.getCookie(environment.accountIdCookie));
    } else {
      params = new HttpParams().set('accountId', '0');
    }

    return this.proxyHttpClientService.get(this.getToursUrl, params);
  }

  getToursByFilters(filters: Filters): Observable<Tour[]> {
    filters.accountId = this.accountService.checkCookie(environment.accountIdCookie)
      ? this.accountService.getCookie(environment.accountIdCookie)
      : 0;

    let params = new HttpParams().set('filters', JSON.stringify(filters));

    return this.proxyHttpClientService.postJson(this.getToursByFiltersUrl, filters);
  }


  maxPrice(): Observable<number> {
    return this.proxyHttpClientService.get(this.getMaxPrice);
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
