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

import { MaskedEmail, MaskedEmailRequest, Address } from '@/models';
import { AddressService } from '@/services';
import { HashService } from '@/services';
import { ClipboardService } from '@/services';
import { CreateOrUpdateMaskedEmailAddressDialogComponentBase } from '../create-or-update-masked-email-address-dialog-base.component';

@Component({
  standalone: true,
  selector: 'app-new-masked-email-address-dialog',
  templateUrl: './new-masked-email-address-dialog.component.html',
  styleUrls: ['./new-masked-email-address-dialog.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class NewMaskedEmailAddressDialogComponent extends CreateOrUpdateMaskedEmailAddressDialogComponentBase {
  public hidePassword = true;
  public timeLeft = 45;
  public interval: NodeJS.Timeout;
  public showGeneratedPassword = false;
  public addressCreated: Address;

  constructor(
    public dialogRef: MatDialogRef<NewMaskedEmailAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { addresses: MaskedEmail[] },
    formBuilder: FormBuilder,
    private addressService: AddressService,
    private hashService: HashService,
    private clipboard: ClipboardService
  ) {
    super(formBuilder);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public managePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public createAddress(): void {
    const request: MaskedEmailRequest = {
      name: this.addressForm.value.name!,
      description: this.addressForm.value.description,
      forwardingEnabled: true,
    };
    if (this.addressForm.value.password?.length ?? 0 > 0) {
      const passwordHash = this.hashService.hashPassword(
        this.addressForm.value.password!
      );
      request.passwordHash = passwordHash;
    }

    console.log(request);

    this.addressService.createAddress(request).subscribe((address) => {
      this.addressCreated = address;
      if (this.addressForm.value.password?.length === 0) {
        // user did not specify a password
        // so we fill in the automatically generated
        // password from the api response
        if (address.password) {
          this.addressForm.patchValue({
            password: address.password!,
          });
          this.copyToClipboard(address.password!);
        }

        this.startTimer(() => this.closeDialogRefAfterCreate());
      } else {
        this.closeDialogRefAfterCreate();
      }
    });
  }

  public closeDialogRefAfterCreate() {
    this.dialogRef.close({
      event: 'Create',
      data: MaskedEmail.fromAddress(this.addressCreated),
    });
  }

  private startTimer(callback: () => void) {
    this.showGeneratedPassword = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 45;
        callback();
      }
    }, 1000);
  }

  private copyToClipboard(text: string): void {
    this.clipboard.copyToClipboard(
      text,
      'The generated password has been copied in your clipboard!'
    );
  }
}
