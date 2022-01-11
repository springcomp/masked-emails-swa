import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MockedHttpProfileInterceptor } from './mocked-http-profile.interceptor';
import { MockedHttpAddressInterceptor } from './mocked-http-address.interceptor';

@Injectable()
export class MockedHttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private profile: MockedHttpProfileInterceptor,
    private address: MockedHttpAddressInterceptor
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.urlWithParams);
    if (req.urlWithParams.endsWith('/api/profiles/my'))
      return this.profile.intercept(req, next);
    return this.address.intercept(req, next);
  }
}
