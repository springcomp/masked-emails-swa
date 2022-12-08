import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Profile } from '@/models';
import { ProfileService } from '@/services';

@Component({
  standalone: true,
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProfileDialogComponent {
  public newForwardingAddress = '';

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) private data: { profile: Profile }
  ) {}

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.onUpdateForwardingAddress();
  }

  private onUpdateForwardingAddress(): void {
    const profile: Profile = {
      displayName: this.data.profile.displayName,
      forwardingAddress: this.newForwardingAddress,
    };

    this.profileService.updateProfile(profile).subscribe((updated) => {
      this.dialogRef.close({ event: 'UpdateProfile', data: updated });
    });
  }
}
