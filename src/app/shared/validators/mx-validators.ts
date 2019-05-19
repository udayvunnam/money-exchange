import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MxValidators {
  public static number(control: AbstractControl): ValidationErrors {
    if (control.value) {
      if (isNaN(control.value)) {
        return { number: true };
      }
    }
    return undefined;
  }

  public static notEqual(val1: string, val2: string): ValidatorFn {
    return (parent: AbstractControl): ValidationErrors => {
      const c1 = parent.get(val1).value;
      const c2 = parent.get(val2).value;

      if (c1 && c2 && c1 === c2) {
        return { equal: true };
      }
      return undefined;
    };
  }
}
