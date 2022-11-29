import { AppRoutingModule } from './app-routing.module';
import { AuthorizationGuard } from './core/authorization-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GravatarModule } from 'ngx-gravatar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Import material module
import { MaterialModule } from './material.module';

//Components
import { AppComponent } from './app.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component'
import { MaskedEmailsComponent } from './masked-emails/masked-emails.component';
import { MessagesComponent } from './messages/messages.component';
import { NewMaskedEmailAddressDialogComponent } from './addresses/new-masked-email-address-dialog/new-masked-email-address-dialog.component';
import { RemoveMaskedEmailAddressDialogComponent } from './addresses/remove-masked-email-address-dialog/remove-masked-email-address-dialog.component';
import { UpdateMaskedEmailAddressDialogComponent } from './addresses/update-masked-email-address-dialog/update-masked-email-address-dialog.component';

import { MockedHttpProfileInterceptor } from './shared/interceptors/mocked-http-profile.interceptor';
import { MockedHttpAddressInterceptor } from './shared/interceptors/mocked-http-address.interceptor';
import { MockedHttpMessagesInterceptor } from './shared/interceptors/mocked-http-messages.interceptor';
import { MockedHttpMessageInterceptor } from './shared/interceptors/mocked-http-message.interceptor';
import { MockedHttpRequestInterceptor } from './shared/interceptors/mocked-http.interceptor';
import { HttpRequestInterceptor } from './shared/interceptors/http.interceptor';

import { environment } from '../environments/environment';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

export const isMocked = environment.mocked;
console.log(`Running Masked Emails Angular app (isMocked: ${isMocked}).`);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InboxComponent,
    LoginComponent,

    NewMaskedEmailAddressDialogComponent,
    RemoveMaskedEmailAddressDialogComponent,
    UpdateMaskedEmailAddressDialogComponent,

  ],
  imports: [
    AppContainerComponent,
    AppRoutingModule,

    LoadingScreenComponent,

    MaskedEmailsComponent,
    MessagesComponent,

    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    GravatarModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    MockedHttpProfileInterceptor,
    MockedHttpAddressInterceptor,
    MockedHttpMessagesInterceptor,
    MockedHttpMessageInterceptor,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMocked ? MockedHttpRequestInterceptor : HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
