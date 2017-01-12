import { Component, Input } from '@angular/core';

@Component({
  selector: 'rio-form-error',
  template: `
    <div
        class="bold black"
        [id]="qaid"
        [attr.data-testid]="testid"
        [ngClass]="{hide: !visible}">
      <ng-content></ng-content>
    </div>
  `
})
export class RioFormError {
  @Input() visible: boolean;
  @Input() qaid: string;
  @Input() testid: string = 'form-error';
}
