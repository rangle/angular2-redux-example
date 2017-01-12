import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs';

import { ValueAccessor } from './value-accessor';

import {
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validators';

export abstract class ControlBase<T> extends ValueAccessor<T> {
  protected abstract model: NgModel; // @ViewChild(NgModel)

  constructor(protected validators: ValidatorArray) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate(this.validators)(this.model.control);
  }

  protected get invalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length > 0);
  }
}
