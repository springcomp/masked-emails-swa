import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Profile } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private helpers: HttpService, private http: HttpClient) {}

  public getProfile(): Observable<Profile> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri('/api/profiles/my');
    return this.http.get<Profile>(requestUri, headers);
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    const headers = { headers: this.helpers.getHeaders() };
    const requestUri = this.helpers.getRequestUri('/api/profiles/my');
    return this.http.patch<Profile>(requestUri, profile, headers);
  }
}
