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
  textBody: 'Sample message\n  This is a test message.',
  htmlBody:
    '<html><head></head><body><h1>Sample message</h1><p>This is a test message.</p></body></html>',
};

const rawMessage: string = `From: bob@example.com
To: Sample_001@masked-emails.tld
Subject: Test message
Date: Fri, 20 Jan 2023 07:52:15 +0000
Content-Type: multipart/mixed;
	boundary="_001_"
MIME-Version: 1.0

--_001_
Content-Type: multipart/alternative;
	boundary="_000_"

--_000_
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: base64

U2FtcGxlIG1lc3NhZ2UNCg0KICBUaGlzIGlzIGEgdGVzdCBtZXNzYWdlLg==

--_000_
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: base64

PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjxoMT5TYW1wbGUgbWVzc2FnZTwvaDE+PHA+VGhpcyB
pcyBhIHRlc3QgbWVzc2FnZS48L3A+PC9ib2R5PjwvaHRtbD4=

--_000_

--_001_

`;

@Injectable()
export class MockedHttpMessageInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.urlWithParams.endsWith('view=source')){
      return of(new HttpResponse({ status: 200, body: rawMessage }));
    }

    console.log('returning mocked inbox message.');
    return of(new HttpResponse({ status: 200, body: message }));
  }
}
