import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MockedHttpProfileInterceptor } from './mocked-http-profile.interceptor';
import { MockedHttpAddressInterceptor } from './mocked-http-address.interceptor';
import { MockedHttpMessagesInterceptor } from './mocked-http-messages.interceptor';
import { MockedHttpMessageInterceptor } from './mocked-http-message.interceptor';

@Injectable()
export class MockedHttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private profile: MockedHttpProfileInterceptor,
    private address: MockedHttpAddressInterceptor,
    private messages: MockedHttpMessagesInterceptor,
    private message: MockedHttpMessageInterceptor,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.urlWithParams);
    if (req.urlWithParams.endsWith('/api/profiles/my'))
      return this.profile.intercept(req, next);
    if (req.urlWithParams.endsWith('/api/messages/my'))
      return this.messages.intercept(req, next);
    if (req.urlWithParams.indexOf('/api/messages/my?location=') != -1)
      return this.message.intercept(req, next);
    return this.address.intercept(req, next);
  }
}
