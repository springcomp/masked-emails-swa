import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public getRequestUri(path: string): string {
    const scheme = window.location.protocol;
    const host = window.location.host;
    const url = `${scheme}//${host}${path}`;
    return url;
  }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}
