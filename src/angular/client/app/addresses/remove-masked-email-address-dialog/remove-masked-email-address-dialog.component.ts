import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddressService } from '../../shared/services/address.service';
import { MaskedEmail } from '../../shared/models/model';
import { RemoveMaskedEmailAddressDialogData } from './RemoveMaskedEmailAddressDialogData';

@Component({
  standalone: true,
  selector: 'app-remove-masked-email-address-dialog',
  templateUrl: './remove-masked-email-address-dialog.component.html',
  styleUrls: ['./remove-masked-email-address-dialog.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,

  ]
})
export class RemoveMaskedEmailAddressDialogComponent {
  public addressForm: FormGroup<RemoveMaskedEmailAddressDialogData>;
  private removingAddress: MaskedEmail;

  constructor(public dialogRef: MatDialogRef<RemoveMaskedEmailAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { removingAddress: MaskedEmail },
    private addressService: AddressService,
    private formBuilder: FormBuilder) {

    this.addressForm = this.formBuilder.group({
      address: new FormControl<string>(
        this.data.removingAddress.emailAddress,
        { validators: Validators.required, nonNullable: true }
      )
    });

    this.removingAddress = this.data.removingAddress;

    console.log(this.data.removingAddress);
  }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {

    console.log(this.addressForm.value.address);

    this.onDelete(this.removingAddress);
  }

  private onDelete(address: MaskedEmail): void {
    this.addressService.deleteAddress(address.emailAddress)
      .subscribe(_ => {
        this.dialogRef.close({ event: 'Confirm' });
        this.removingAddress = undefined;
      });
  }
}
