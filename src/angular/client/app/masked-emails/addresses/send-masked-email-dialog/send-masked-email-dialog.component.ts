import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SendMaskedEmailDialogData } from './SendMaskedEmailDialogData';
import { MarkdownService } from 'ngx-markdown';

import { MarkdownEditorComponent } from '@/core/markdown-editor/markdown-editor.component';
import { AddressService } from '@/services';
import { EmailAddress } from '@/models';

@Component({
  standalone: true,
  selector: 'send-masked-email-dialog',
  templateUrl: './send-masked-email-dialog.component.html',
  styleUrls: ['./send-masked-email-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MarkdownEditorComponent,
  ],
})
export class SendMaskedEmailDialogComponent {
  public emailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SendMaskedEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { from: EmailAddress },
    formBuilder: FormBuilder,
    private addressService: AddressService,
    private snackBar: MatSnackBar,
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer
  ) {
    this.emailForm = formBuilder.group<SendMaskedEmailDialogData>({
      from: new FormControl(
        SendMaskedEmailDialogComponent.formatEmailAddress(data.from),
        {
          validators: Validators.required,
          nonNullable: true,
        }
      ),
      subject: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      to: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      markdown: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  public renderMarkdown(): SafeHtml {
    const text = this.emailForm.value.markdown?.toString() ?? '';
    const html = this.markdownService.parse(text);
    const sanitized = this.sanitizer.bypassSecurityTrustHtml(html);
    return sanitized ?? '';
  }

  public close(): void {
    this.dialogRef.close();
  }

  public sendEmail(): void {
    // horrible hack:
    // TODO: find a better way to extract HTML string

    const html = this.renderMarkdown();
    const { changingThisBreaksApplicationSecurity } = html as any;

    const address = this.data.from.address;
    const sender = SendMaskedEmailDialogComponent.formatEmailAddress(
      this.data.from
    );

    const request = {
      from: sender,
      to: this.emailForm.value.to,
      subject: this.emailForm.value.subject,
      htmlBody: changingThisBreaksApplicationSecurity,
    };

    this.addressService.sendEmail(address, request).subscribe(() => {
      this.snackBar.open(
        'Email has been successfullfy submitted for delivery.',
        'Send an email',
        {
          duration: 2000,
        }
      );
      this.close();
    });
  }

  private static formatEmailAddress(address: EmailAddress) {
    return address.displayName
      ? `${address.displayName} <${address.address}>`
      : address.address;
  }
}
