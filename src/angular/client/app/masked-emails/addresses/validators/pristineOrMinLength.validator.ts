import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function pristineOrminLength(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pristine = control.pristine;
    const hasLength = control.value.length >= length;
    if (pristine || hasLength) {
      return null;
    }

    return { pristineOrMinLength: true };
  };
}
