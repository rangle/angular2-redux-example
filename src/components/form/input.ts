import {
  Component,
  Input,
  Inject,
  Optional,
  ViewChild,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  NgModel,
  ValidatorFn,
  AsyncValidatorFn,
  Validator,
} from '@angular/forms';

import { Observable } from 'rxjs';

import {
  validate,
} from './validators';

@Component({
  selector: 'rio-input',
  template: `
    <input
      [id]="qaid"
      [type]="inputType || 'text'"
      class="block col-12 mb1 input"
      [ngClass]="{'border-red': model.control.touched && (invalid | async)}"
      [attr.placeholder]="placeholder || ''"
    />
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RioInput,
    multi: true
  }]
})
export class RioInput {
  @Input() inputType: string;
  @Input() placeholder: string;
  @Input() qaid: string;

  @ViewChild(NgModel) private model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) private validators: Array<Validator | ValidatorFn>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<Validator | AsyncValidatorFn>
  ) {}

  private get invalid(): Observable<boolean> {
    return validate(this.validators, this.asyncValidators).map(v => Object.keys(v).length > 0);
  }
};
