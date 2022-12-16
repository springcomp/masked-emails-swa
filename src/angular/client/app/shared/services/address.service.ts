import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HttpService } from './http.service';
import {
  Address,
  AddressPages,
  MaskedEmailRequest,
  SendEmailRequest,
  UpdateMaskedEmailRequest,
} from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private helpers: HttpService, private http: HttpClient) {}

  public getAddresses(): Observable<Address[]> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri('/api/profiles/my/addresses');
    return this.http.get<Address[]>(requestUri, headers);
  }

  public getAddressesPages(
    top: number,
    cursor?: string,
    sort_by?: string
  ): Observable<AddressPages> {
    const headers = { headers: this.helpers.getHeaders() };

    const requestUri = this.urlBuilder(
      '/api/profiles/my/address-pages',
      top,
      cursor,
      sort_by
    );

    return this.http.get<AddressPages>(requestUri, headers);
  }

  public createAddress(request: MaskedEmailRequest): Observable<Address> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri('/api/profiles/my/addresses');
    return this.http.post<Address>(requestUri, request, headers);
  }

  public updateAddress(
    email: string,
    request: UpdateMaskedEmailRequest
  ): Observable<unknown> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri(
      `/api/profiles/my/addresses/${email}`
    );
    return this.http.patch(requestUri, request, headers);
  }

  public deleteAddress(email: string): Observable<unknown> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri(
      `/api/profiles/my/addresses/${email}`
    );
    return this.http.delete(requestUri, headers);
  }

  public toggleAddressForwarding(email: string): Observable<unknown> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri(
      `/api/profiles/my/addresses/${email}/enableForwarding`
    );
    return this.http.patch(requestUri, {}, headers);
  }

  public getSearchedAddresses(
    top?: number,
    cursor?: string,
    contains?: string,
    sort_by?: string
  ): Observable<AddressPages> {
    const headers = { headers: this.helpers.getHeaders() };

    const requestUri = this.urlBuilder(
      '/api/profiles/my/search',
      top,
      cursor,
      sort_by,
      contains
    );

    return this.http.get<AddressPages>(requestUri, headers);
  }

  public sendEmail(request: SendEmailRequest): Observable<any> {

    const email = request.from;
    const req = {
      from: request.from,
      to: request.to,
      subject: request.subject,
      htmlBody: JSON.stringify(request.htmlBody),
    }

    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri(
      `/api/profiles/my/addresses/${email}`
    );

    return this.http.post<SendEmailRequest>(requestUri, req, headers);
  }

  private urlBuilder(
    url: string,
    top?: number,
    cursor?: string,
    sort_by?: string,
    search?: string
  ): string {
    const query_params: string[] = [];
    if (top) {
      query_params.push('top=' + top);
    }

    if (cursor) {
      query_params.push('cursor=' + cursor);
    }

    if (sort_by) {
      query_params.push('sort_by=' + sort_by);
    }

    if (search) {
      query_params.push('contains=' + search);
    }

    if (query_params.length === 0) return this.helpers.getRequestUri(url);

    const query_string = query_params.join('&');

    return this.helpers.getRequestUri(url + '?' + query_string);
  }
}
