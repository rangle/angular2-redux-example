import {
  AbstractControl,
  AsyncValidatorFn,
  Validator,
  Validators,
  ValidatorFn,
} from '@angular/forms';

import { Observable } from 'rxjs';

type AsyncValidator = Validator | AsyncValidatorFn;

type SyncValidator = Validator | ValidatorFn;

type AsyncValidatorArray = Array<AsyncValidator>;

type ValidatorArray = Array<SyncValidator>;

const coerceToValidator = (validator: ValidatorFn | ValidatorFn[]): ValidatorFn => {
  return Array.isArray(validator) ? composeValidators(validator) : validator;
}

const coerceToAsyncValidator =
    (asyncValidator: AsyncValidatorFn | AsyncValidatorFn[]): AsyncValidatorFn => {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator;
}

const normalizeValidator = (validator: SyncValidator): ValidatorFn => {
  if (typeof (<Validator> validator).validate === 'function') {
    return (c: AbstractControl) => (<Validator> validator).validate(c);
  } else {
    return <ValidatorFn> validator;
  }
}

const normalizeAsyncValidator = (validator: AsyncValidator): AsyncValidatorFn => {
  if (typeof (<Validator> validator).validate === 'function') {
    return (c: AbstractControl) => (<Validator> validator).validate(c);
  } else {
    return <AsyncValidatorFn> validator;
  }
}

export const composeValidators = (validators: ValidatorArray): ValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }
  return Validators.compose(validators.map(normalizeValidator));
}

export const composeAsyncValidators = (validators: AsyncValidatorArray): AsyncValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }
  return Validators.composeAsync(validators.map(normalizeAsyncValidator));
}

export const validate = (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
  const asyncValidator = composeAsyncValidators(this.asyncValidators);
  if (asyncValidator) {
    return asyncValidator(this.model.control);
  }

  const validator = composeValidators(this.validators);
  if (validator) {
    return Observable.of(validator(this.model.control));
  }

  return Observable.of(null);
};