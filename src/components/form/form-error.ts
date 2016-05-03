import { Component, Input } from '@angular/core';

@Component({
  selector: 'rio-form-error',
  template: `
    <div
      [id]="qaid"
      class="bold black"
      [ngClass]="{ 'display-none': !visible }">
      <ng-content></ng-content>
    </div>
  `
})
export class RioFormError {
  @Input() visible: boolean;
  @Input() qaid: string;
};
