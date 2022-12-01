import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router } from '@angular/router';

import { GravatarModule } from 'ngx-gravatar';

import { AuthService } from '../core/auth.service';
import { Profile } from '../shared/models/model';
import { ProfileService } from '../shared/services/profile.service';
import { UserButtonComponent } from './user-button/user-button.component';
import { EditForwardingAddressComponent } from './edit-forwarding-address/edit-forwarding-address.component';

@Component({
  standalone: true,
  selector: 'app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GravatarModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    UserButtonComponent,
    EditForwardingAddressComponent,
  ]
})
export class AppContainerComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;

  public isAuthenticated: boolean = false;

  public my: Profile | undefined = undefined;

  constructor(
    private profileService: ProfileService,
    public authService: AuthService,
    public router: Router,
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  async ngOnInit(){
    await this.authService.ngOnInit();
    if (this.authService.getIsAuthorized()){
        this.isAuthenticated = true;
        this.loadProfile();
    }
    this.router.events.subscribe(event => {
      // close side nav on routing
      if (this.sidenav && this.sidenav.opened) {
        this.sidenav.close();
      }
    });
  }

  get forwardingAddress(): string {
    return this.my && this.my.forwardingAddress ? this.my.forwardingAddress : '';
  }

  get userIsAuthenticated(): boolean {
    return this.isAuthenticated && this.my != undefined;
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public home() {
    this.router.navigate(['/masked-emails']);
  }

  public inbox() {
    this.router.navigate(['/inbox']);
  }

  public updateUserModel(user: Profile) {
    this.my = user;
  }

  private loadProfile(): void {
    this.profileService.getProfile()
      .subscribe(profile => this.my = profile);
  }
}
