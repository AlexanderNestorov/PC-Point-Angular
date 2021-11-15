import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) { return null; }
  return /^[a-zA-Z0-9\.-]{4,}@(gmail|abv|yahoo|outlook|mail|email)\.(bg|com)$/.test(control.value) ? null : {
    invalidEmail: true
  };
}

export function rePasswordValidator(getTargetControl: AbstractControl): ValidatorFn {
  // tslint:disable-next-line:no-shadowed-variable
  return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
    const areTheSame = getTargetControl.value === control.value;
    return areTheSame ? null : {rePasswordValidator: true};
  };
}


export function fileExtensionValidator(validExt: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;
    if (control.value) {
      const fileExt = control.value.split('.').pop();
      validExt.split(',').forEach(ext => {
        if (ext.trim() === fileExt) {
          forbidden = false;
        }
      });
    }
    return forbidden ? { inValidExt: true } : null;
  };
}
