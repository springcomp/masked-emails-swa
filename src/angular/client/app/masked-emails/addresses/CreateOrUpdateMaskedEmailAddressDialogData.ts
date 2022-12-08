import { FormControl } from '@angular/forms';

export interface CreateOrUpdateMaskedEmailAddressDialogData {
  name: FormControl<string>;
  description: FormControl<string>;
  password: FormControl<string>;
}
