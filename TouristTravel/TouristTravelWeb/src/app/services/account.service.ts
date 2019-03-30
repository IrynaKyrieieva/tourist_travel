import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { AccountSignUp } from '../models/account-sign-up';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';

@Injectable()
export class AccountService {
  private url = environment.apiUrl + '/account/';
  private readonly signUpUrl = this.url + 'signUp';
  private readonly signInUrl = this.url + 'signIn';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private cookieService: CookieService) { }

  signUp(account: AccountSignUp): Observable<boolean> {
    account.dateOfSignUp = new Date().toLocaleString('en-US');
    return this.proxyHttpClientService.postJson(this.signUpUrl, account);
  }

  signIn(email: string, password: string): Observable<Account> {
    const params = new HttpParams()
      .set('signInDateTime', new Date().toLocaleString('en-US'))
      .set('email', email)
      .set('password', password);

    return this.proxyHttpClientService.get(this.signInUrl, params);
  }

  saveToCookie(cookieName: string, data: any): void {
    this.cookieService.set(cookieName, data);
  }

  getCookie(cookieName: string): string {
    return this.cookieService.get(cookieName);
  }

  deleteCookie(cookieName: string): void {
    this.cookieService.delete(cookieName);
  }

  checkCookie(cookieName: string): boolean {
    return this.cookieService.check(cookieName);
  }
}
