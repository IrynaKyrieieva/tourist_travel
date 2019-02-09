import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProxyHttpClientService } from './proxy-http-client.service';

@Injectable()
export class AccountService {

  private url = environment.apiUrl + '/account/';

  constructor(private proxyHttpClientService: ProxyHttpClientService,
              private readonly router: Router) { }
}
