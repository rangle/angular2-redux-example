import { Component, Input } from '@angular/core';
import { NgFormControl } from '@angular/common';

@Component({
  selector: 'rio-input',
  directives: [ NgFormControl ],
  template: `
    <input
      [id]="qaid"
      [type]="inputType"
      class="block col-12 mb1 input"
      [attr.placeholder]="placeholder"
      [ngFormControl]="formControl"
    />
  `
})
export class RioInput {
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() formControl: NgFormControl;
  @Input() qaid: string;
};
