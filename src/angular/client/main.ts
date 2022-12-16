import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import {
  enableProdMode,
  ImportedNgModuleProviders,
  importProvidersFrom,
  Provider,
  SecurityContext,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';

import { AuthorizationGuard } from '@/core';

import {
  HttpRequestInterceptor,
  MockedHttpRequestInterceptor,
} from '@/interceptors';
import {
  MockedHttpMessageInterceptor,
  MockedHttpMessagesInterceptor,
} from '@/interceptors';
import {
  MockedHttpProfileInterceptor,
  MockedHttpAddressInterceptor,
} from '@/interceptors';

import { HomeComponent } from '@/routes/home';
import { InboxComponent } from '@/routes/inbox';
import { LoginComponent } from '@/routes/login';
import { MaskedEmailsComponent } from '@/routes/masked-emails';
import { UnauthorizedComponent } from '@/routes/unauthorized';

import { environment } from '@/environment';
import {
  MarkdownModule,
  MarkdownModuleConfig,
  MarkedOptions,
} from 'ngx-markdown';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export const isMocked = environment.mocked;
console.log(`Running Masked Emails Angular app (isMocked: ${isMocked}).`);

const markdownConfig: MarkdownModuleConfig = {
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    },
  },
  sanitize: SecurityContext.NONE,
};

const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/masked-emails' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'masked-emails',
    component: MaskedEmailsComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthorizationGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'masked-emails' },
];

const providers: Array<Provider | ImportedNgModuleProviders> = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: isMocked ? MockedHttpRequestInterceptor : HttpRequestInterceptor,
    multi: true,
  },
  importProvidersFrom([
    BrowserAnimationsModule,
    MarkdownModule.forRoot(markdownConfig),
    RouterModule.forRoot(ROUTES, {}),
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

bootstrapApplication(AppComponent, { providers }).catch((err) =>
  console.log(err)
);
