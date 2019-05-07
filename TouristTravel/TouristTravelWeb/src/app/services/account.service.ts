import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { AccountSignUp } from '../models/account-sign-up';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';
import {PasswordChange} from '../models/password-change';

@Injectable()
export class AccountService {
  private url = environment.apiUrl + '/account/';
  private readonly signUpUrl = this.url + 'signUp';
  private readonly signInUrl = this.url + 'signIn';
  private readonly getAccountUrl = this.url + 'getAccountById';
  private readonly updateUrl = this.url + 'updateAccount';
  private readonly updatePasswordUrl = this.url + 'updatePassword';

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

  updateAccount(account: Account): Observable<boolean> {
    return this.proxyHttpClientService.postJson(this.updateUrl, account);
  }

  updatePassword(passwordDataModel: PasswordChange): Observable<boolean> {
    return this.proxyHttpClientService.postJson(this.updatePasswordUrl, passwordDataModel);
  }

  getAccount(): Observable<Account> {
    const params = new HttpParams()
      .set('accountId', this.getCookie(environment.accountIdCookie));

    return this.proxyHttpClientService.get(this.getAccountUrl, params);
  }

  saveToCookie(cookieName: string, data: any): void {
    this.cookieService.set(cookieName, data);
  }

  getCookie(cookieName: string): any {
    return this.cookieService.get(cookieName);
  }

  deleteCookie(cookieName: string): void {
    this.cookieService.delete(cookieName);
  }

  checkCookie(cookieName: string): boolean {
    return this.cookieService.check(cookieName);
  }

  isSignIn(): boolean {
    return this.checkCookie(environment.accountIdCookie) ? true : false;
  }
}
