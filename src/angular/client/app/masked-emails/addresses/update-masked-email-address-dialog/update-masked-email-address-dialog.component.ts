import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddressService } from '@/services';
import { HashService } from '@/services';
import { MaskedEmail, UpdateMaskedEmailRequest } from '@/models';
import { CreateOrUpdateMaskedEmailAddressDialogComponentBase } from '../create-or-update-masked-email-address-dialog-base.component';

@Component({
  standalone: true,
  selector: 'app-update-masked-email-address-dialog',
  templateUrl: './update-masked-email-address-dialog.component.html',
  styleUrls: ['./update-masked-email-address-dialog.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class UpdateMaskedEmailAddressDialogComponent extends CreateOrUpdateMaskedEmailAddressDialogComponentBase {
  public newAddressName: string;
  public newAddressDescription?: string;
  public newPassword?: string;

  private updatingAddress: MaskedEmail;

  constructor(
    public dialogRef: MatDialogRef<UpdateMaskedEmailAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { updatingAddress: MaskedEmail },
    formBuilder: FormBuilder,
    private addressService: AddressService,
    private hashService: HashService
  ) {
    super(
      formBuilder,
      data.updatingAddress.name,
      data.updatingAddress.description
    );

    this.updatingAddress = this.data.updatingAddress;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public update(): void {
    this.newAddressName = this.addressForm.value.name!;
    this.newAddressDescription = this.addressForm.value.description;
    if (this.addressForm.value.password?.length ?? 0 > 0) {
      this.newPassword = this.addressForm.value.password!;
    }

    if (
      this.updatingAddress.name !== this.newAddressName ||
      this.updatingAddress.description !== this.newAddressDescription ||
      (this.newPassword?.length ?? 0) > 0
    ) {
      console.log('updating...');
      this.updatingAddress.name = this.newAddressName;
      this.updatingAddress.description = this.newAddressDescription!;

      this.onUpdate(this.updatingAddress, this.newPassword ?? undefined);
    }

    this.close();
  }

  private onUpdate(address: MaskedEmail, password: string | undefined): void {
    const updateRequest: UpdateMaskedEmailRequest = {
      name: address.name,
      description: address.description,
    };
    if (password?.length ?? 0 > 0) {
      const passwordHash = this.hashService.hashPassword(password!);
      updateRequest.passwordHash = passwordHash;
    }

    console.log(updateRequest);

    this.addressService
      .updateAddress(address.emailAddress, updateRequest)
      .subscribe((_) => {
        this.close();
      });
  }
}
