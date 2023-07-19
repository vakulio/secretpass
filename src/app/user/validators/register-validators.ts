import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const mathingControl = group.get(matchingControlName);

      if (!control || !mathingControl) {
        console.error('Form controls can be found in the form group');
        return { controlNotFound: false };
      }

      const error =
        control.value === mathingControl.value ? null : { noMatch: true };

      mathingControl.setErrors(error);

      return error;
    };
  }
}
