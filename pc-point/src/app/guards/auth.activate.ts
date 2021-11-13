import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../services/user/token-storage.service';


@Injectable()
export class AuthActivate implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const {authenticationRequired, authenticationFailureRedirectUrl} = route.data;
    if (
      typeof authenticationRequired === 'boolean' &&
      authenticationRequired === this.tokenStorageService.isLogged
    ) {
      return true;
    }

    let authRedirectUrl = authenticationFailureRedirectUrl;
    if (authenticationRequired) {
      const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`, '');
      authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
    }

    return this.router.parseUrl(authRedirectUrl || '/');
  }

}
