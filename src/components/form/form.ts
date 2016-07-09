import { Component, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup } from '@angular/forms';

@Component({
  selector: 'rio-form',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <form [formGroup]="group"
      (ngSubmit)="onSubmit.emit($event)">
      <ng-content></ng-content>
    </form>
  `
})
export class RioForm {
  @Input() group: FormGroup;
  @Output() onSubmit = new EventEmitter<Event>();
};
