import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Profile } from '../models/model';

const profile: Profile = {
  displayName: 'Alice',
  forwardingAddress: 'alice@example.com',
};

@Injectable()
export class MockedHttpProfileInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<Profile>> {
    console.log(`returning mocked profile for: ${profile.displayName}.`);
    return of(new HttpResponse({ status: 200, body: profile }));
  }
}
