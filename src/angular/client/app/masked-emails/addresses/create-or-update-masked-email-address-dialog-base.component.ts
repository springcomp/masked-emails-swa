import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateOrUpdateMaskedEmailAddressDialogData } from './CreateOrUpdateMaskedEmailAddressDialogData';
import { pristineOrminLength } from './validators/pristineOrMinLength.validator';

export class CreateOrUpdateMaskedEmailAddressDialogComponentBase {
  public addressForm: FormGroup<CreateOrUpdateMaskedEmailAddressDialogData>;

  protected minPasswordLength: number = 10;

  constructor(
    protected formBuilder: FormBuilder,
    name: string | undefined = undefined,
    description: string | undefined = undefined
  ) {
    this.addressForm =
      this.formBuilder.group<CreateOrUpdateMaskedEmailAddressDialogData>({
        name: new FormControl(name === undefined ? '' : name, {
          validators: Validators.required,
          nonNullable: true,
        }),
        description: new FormControl(
          description === undefined ? '' : description,
          { nonNullable: false }
        ),
        password: new FormControl('', {
          validators: pristineOrminLength(this.minPasswordLength),
          nonNullable: false,
        }),
      });
  }

  public getErrorMessageForName() {
    return this.addressForm.get('name').hasError('required')
      ? 'You must enter a value'
      : '';
  }

  public getErrorMessageForPassword() {
    return this.addressForm.get('password').hasError('pristineOrMinLength')
      ? `The password must be at least ${this.minPasswordLength} characters long`
      : '';
  }
}
