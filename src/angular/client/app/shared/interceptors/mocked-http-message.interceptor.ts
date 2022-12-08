import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from '@/models';

const message: Message = {
  location: '/inbox/messages/001.eml',
  receivedUtc: new Date(),
  sender: { address: 'bob@example.com' },
  subject: 'Test message',
  textBody: 'This is a sample test message',
  htmlBody:
    '<html><head></head><body><h1>Sample message</h1><p>This is a test message.</p></body></html>',
};

@Injectable()
export class MockedHttpMessageInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<Message>> {
    console.log('returning mocked inbox message.');
    return of(new HttpResponse({ status: 200, body: message }));
  }
}
