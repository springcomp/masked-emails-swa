import { FormControl } from '@angular/forms';

export interface CreateOrUpdateMaskedEmailAddressDialogData {
  name: FormControl<string>;
  description?: FormControl<string|null>;
  password: FormControl<string|null>;
}
