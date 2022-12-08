import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageSpec } from '../models/model';

const messages: MessageSpec[] = [
  {
    location: '/inbox/messages/001.eml',
    receivedUtc: new Date(),
    sender: { address: 'bob@example.com' },
    subject: 'Test message',
  },
];

@Injectable()
export class MockedHttpMessagesInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('returning mocked inbox message list.');
    return of(new HttpResponse({ status: 200, body: messages }));
  }
}
