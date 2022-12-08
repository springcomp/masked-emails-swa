import { Component, OnInit, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GravatarModule } from 'ngx-gravatar';

import { Profile } from '@/models';

@Component({
  standalone: true,
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  imports: [
    FontAwesomeModule,
    GravatarModule,
  ]
})
export class UserButtonComponent implements OnInit {

  @Input() icon: string;
  @Input() user: Profile;

  constructor() { }

  ngOnInit() {
  }

  get forwardingAddress(): string {
    return this.user && this.user.forwardingAddress ? this.user.forwardingAddress : '';
  }
}
