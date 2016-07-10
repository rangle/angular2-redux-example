import { Component, Input } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl } from '@angular/forms';

@Component({
  selector: 'rio-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <input
      [id]="qaid"
      [type]="inputType"
      class="block col-12 mb1 input"
      [attr.placeholder]="placeholder"
      [formControl]="control"
    />
  `
})
export class RioInput {
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() control: FormControl;
  @Input() qaid: string;
};
