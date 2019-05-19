import { CanActivate } from '@angular/router';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class WishListGuard implements CanActivate {

    constructor(private accountService: AccountService) { }

    canActivate(): boolean {
        return this.accountService.checkCookie(environment.accountIdCookie);
    }
}
