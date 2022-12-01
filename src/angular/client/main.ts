import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { enableProdMode, ImportedNgModuleProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';

import { AuthorizationGuard } from './app/core/authorization-guard';

import { HttpRequestInterceptor } from './app/shared/interceptors/http.interceptor';
import { MockedHttpMessageInterceptor } from './app/shared/interceptors/mocked-http-message.interceptor';
import { MockedHttpAddressInterceptor } from './app/shared/interceptors/mocked-http-address.interceptor';
import { MockedHttpMessagesInterceptor } from './app/shared/interceptors/mocked-http-messages.interceptor';
import { MockedHttpProfileInterceptor } from './app/shared/interceptors/mocked-http-profile.interceptor';
import { MockedHttpRequestInterceptor } from './app/shared/interceptors/mocked-http.interceptor';

import { HomeComponent } from './app/home/home.component';
import { InboxComponent } from './app/inbox/inbox.component';
import { LoginComponent } from './app/login/login.component';
import { MaskedEmailsComponent } from './app/masked-emails/masked-emails.component';
import { UnauthorizedComponent } from './app/unauthorized/unauthorized.component';

import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export const isMocked = environment.mocked;
console.log(`Running Masked Emails Angular app (isMocked: ${isMocked}).`);

const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/masked-emails' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'masked-emails', component: MaskedEmailsComponent, canActivate: [AuthorizationGuard]},
  { path: 'inbox', component: InboxComponent, canActivate: [AuthorizationGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '**', redirectTo: 'masked-emails' }
];

const providers: Array<Provider | ImportedNgModuleProviders> = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: isMocked ? MockedHttpRequestInterceptor : HttpRequestInterceptor,
    multi: true
  },
  importProvidersFrom([
    RouterModule.forRoot(ROUTES, {}),
    BrowserAnimationsModule
  ]),
  provideHttpClient(withInterceptorsFromDi()),
  AuthorizationGuard,
  // HTTP request interceptors
  MockedHttpRequestInterceptor,
  MockedHttpProfileInterceptor,
  MockedHttpAddressInterceptor,
  MockedHttpMessageInterceptor,
  MockedHttpMessagesInterceptor,
  //
  MatSnackBar,
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, { providers })
  .then(() => { })
  .catch(err => console.log(err));
