import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProxyHttpClientService } from './proxy-http-client.service';
import { AccountSignUp } from '../models/account-sign-up';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AccountService {

  private cookieToken = 'account_token';
  private url = environment.apiUrl + '/account/';
  private readonly signUpUrl = this.url + 'signUp';
  private readonly signInUrl = this.url + 'signIn';
  private readonly updateUrl = this.url + 'update';
  private readonly getAccountUrl = this.url + 'getAccount';
  private readonly testUrl = this.url + 'test';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private readonly router: Router) { }

  test(): Observable<any> {
    return this.proxyHttpClientService.get(this.testUrl);
  }
}
