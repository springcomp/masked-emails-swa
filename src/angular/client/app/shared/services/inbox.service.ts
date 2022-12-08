import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Message, MessageSpec } from '../models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  constructor(private helpers: HttpService, private http: HttpClient) {}

  public getMessages(): Observable<MessageSpec[]> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri('/api/messages/my');
    return this.http.get<MessageSpec[]>(requestUri, headers);
  }
  public getMessage(location: string): Observable<Message> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri(
      `/api/messages/my?location=${location}`
    );
    return this.http.get<Message>(requestUri, headers);
  }
}
