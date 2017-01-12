import {
  AbstractControl,
  Validator,
  Validators,
  ValidatorFn,
} from '@angular/forms';

import { Observable } from 'rxjs';

export type ValidatorArray = Array<Validator | ValidatorFn>;

export type ValidationResult = {[validator: string]: string | boolean};

export const composeValidators = (validators: ValidatorArray): ValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }

  return Validators.compose(validators.map(v => {
    return typeof v === 'function'
      ? v
      : (c: AbstractControl) => v.validate.bind(v);
    }));
};

export const validate = (validators: ValidatorArray) => {
  return (control: AbstractControl) => {
    if (validators &&
        validators.length > 0) {
      return Observable.of(composeValidators(validators)(control));
    }

    return Observable.of(null);
  };
};

export const message = (validator: ValidationResult, key: string): string => {
  switch (key) {
    case 'required':
      return 'Please enter a value';
    case 'pattern':
      return 'Value does not match required pattern';
    case 'minlength':
      return 'Minimum number of characters not met';
    case 'maxlength':
      return 'Value exceeds maximum number of characters';
  }

  switch (typeof validator[key]) {
    case 'string':
      return <string> validator[key];
    default:
      return `Validation failure (${key})`;
  }
};
