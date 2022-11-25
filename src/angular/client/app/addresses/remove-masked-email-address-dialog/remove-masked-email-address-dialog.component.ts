import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AddressService } from '../../shared/services/address.service';
import { MaskedEmail } from '../../shared/models/model';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RemoveMaskedEmailAddressDialogData } from './RemoveMaskedEmailAddressDialogData';

@Component({
  selector: 'app-remove-masked-email-address-dialog',
  templateUrl: './remove-masked-email-address-dialog.component.html',
  styleUrls: ['./remove-masked-email-address-dialog.component.scss']
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
