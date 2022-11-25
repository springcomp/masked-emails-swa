import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { MaskedEmailsComponent } from './masked-emails/masked-emails.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AuthorizationGuard } from './core/authorization-guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/masked-emails' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'masked-emails', component: MaskedEmailsComponent, canActivate: [AuthorizationGuard]},
  { path: 'inbox', component: InboxComponent, canActivate: [AuthorizationGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '**', redirectTo: 'masked-emails' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
