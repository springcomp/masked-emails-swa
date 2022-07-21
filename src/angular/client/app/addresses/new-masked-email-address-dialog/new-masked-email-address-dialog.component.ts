import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaskedEmail, MaskedEmailRequest, Address } from '../../shared/models/model';
import { AddressService } from '../../shared/services/address.service';
import { HashService } from '../../shared/services/hash.service';
import { ClipboardService } from '../../shared/services/clipboard.service';
import { CreateOrUpdateMaskedEmailAddressDialogComponentBase } from '../create-or-update-masked-email-address-dialog-base.component';

@Component({
  selector: 'app-new-masked-email-address-dialog',
  templateUrl: './new-masked-email-address-dialog.component.html',
  styleUrls: ['./new-masked-email-address-dialog.component.scss']
})
export class NewMaskedEmailAddressDialogComponent extends CreateOrUpdateMaskedEmailAddressDialogComponentBase implements OnInit {
  public hidePassword: boolean = true;
  public timeLeft: number = 45;
  public interval: NodeJS.Timeout;
  public showGeneratedPassword: boolean = false;
  public addressCreated: Address;

  constructor(public dialogRef: MatDialogRef<NewMaskedEmailAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { addresses: MaskedEmail[] },
    formBuilder: FormBuilder,
    private addressService: AddressService,
    private hashService: HashService,
    private clipboard: ClipboardService) {

    super(formBuilder);
  }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public managePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public createAddress(): void {
    var request: MaskedEmailRequest = {
      name: this.addressForm.value.name,
      description: this.addressForm.value.description,
      forwardingEnabled: true
    };
    if (this.addressForm.value.password?.length > 0) {
      const passwordHash = this.hashService.hashPassword(this.addressForm.value.password);
      request.passwordHash = passwordHash;
    }

    console.log(request);

    this.addressService.createAddress(request)
      .subscribe(address => {
        this.addressCreated = address;
        if (this.addressForm.value.password?.length === 0) {
          this.addressForm.value.password = address.password;
          this.copyToClipboard(address.password);

          this.startTimer(() => this.closeDialogRefAfterCreate());

        } else {
          this.closeDialogRefAfterCreate();
        }
      });
  }

  public closeDialogRefAfterCreate() {
    this.dialogRef.close({ event: 'Create', data: MaskedEmail.fromAddress(this.addressCreated) });
  }

  private startTimer(callback: Function) {
    this.showGeneratedPassword = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 45;
        callback();
      }
    }, 1000)
  }

  private copyToClipboard(text: string): void {
    this.clipboard.copyToClipboard(
      text,
      'The generated password has been copied in your clipboard!'
    );
  }
}
