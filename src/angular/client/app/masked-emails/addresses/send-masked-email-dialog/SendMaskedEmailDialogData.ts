import { FormControl } from '@angular/forms';

export interface SendMaskedEmailDialogData {
  from: FormControl<string>;
  to: FormControl<string>;
  subject: FormControl<string>;
  markdown: FormControl<string | null>;
}
