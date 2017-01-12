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

import { ControlBase } from './control';

@Component({
  selector: 'rio-input',
  template: `
    <input
      #model="ngModel"
      [(ngModel)]="value"
      (blur)="touch()"
      [id]="qaid"
      [type]="inputType || 'text'"
      class="block col-12 mb1 input"
      [ngClass]="{invalid: model.control.touched && (invalid | async)}"
      [attr.placeholder]="placeholder || ''"
    />
  `,
  styles: [`
    .invalid {
      border: 1px solid red;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RioInput,
    multi: true,
  }]
})
export class RioInput extends ControlBase<string> {
  @Input() inputType: string;
  @Input() placeholder: string;
  @Input() qaid: string;

  @ViewChild(NgModel) protected model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS)
      validators: Array<Validator | ValidatorFn>
  ) {
    super(validators);
  }
}
