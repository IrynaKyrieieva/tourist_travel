import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private url = environment.apiUrl + '/letter/';
  private readonly subscribeUrl = this.url + 'subscribe';

  constructor(private proxyHttpClientService: ProxyHttpClientService) { }

  subscribe(email: string): Observable<boolean> {
    const params = new HttpParams()
      .set('email', email)
      .set('dateOfSubscribe', new Date().toLocaleString('en-US'));

    return this.proxyHttpClientService.get(this.subscribeUrl, params);
  }
}
