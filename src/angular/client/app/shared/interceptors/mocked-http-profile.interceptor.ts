import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Profile } from '../models/model';

const profile: Profile = {
  displayName: 'Alice',
  forwardingAddress: 'alice@example.com',
};

@Injectable()
export class MockedHttpProfileInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`returning mocked profile for: ${profile.displayName}.`);
    return of(new HttpResponse({ status: 200, body: profile, }));
  }
}
