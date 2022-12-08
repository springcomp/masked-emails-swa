import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Profile } from '@/models';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  standalone: true,
  selector: 'app-edit-forwarding-address',
  templateUrl: './edit-forwarding-address.component.html',
  styleUrls: ['./edit-forwarding-address.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    ProfileDialogComponent,
  ],
})
export class EditForwardingAddressComponent implements OnInit {
  @Input() userIsAuthenticated: boolean;
  @Input() user: Profile;

  @Output() updateUserModel = new EventEmitter<Profile>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  public openDialog(): void {
    //Open dialog window to update profile
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: { profile: this.user },
    });

    //Action to handle after closing the dialog window
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event == 'UpdateProfile') {
        this.updateUserModel.emit(result.data);
      }
    });
  }
}
