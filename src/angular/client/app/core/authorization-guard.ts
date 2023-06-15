import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationGuard  {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkUser(route.url[0].path);
  }

  canLoad(state: Route): Observable<boolean> {
    return this.checkUser();
  }

  private checkUser(route?: string): Observable<boolean> {
    const promise = this.authService.onInit();
    const observable = from(promise);
    return observable.pipe(
      map(() => {
        const isAuthenticated = this.authService.getIsAuthenticated();
        if (!isAuthenticated) {
          let redirect = '/.auth/login/aad';
          if (route != null) {
            redirect += `?post_login_redirect_uri=/${route}`;
          }
          this.authService.navigate(redirect);
          return false;
        }

        const isAuthorized = this.authService.getIsAuthorized();
        if (!isAuthorized) {
          const redirect = '/unauthorized';
          this.authService.navigate(redirect);
          return false;
        }

        return true;
      })
    );
  }
}
