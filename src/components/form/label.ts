import { Component, Input } from '@angular/core';

@Component({
  selector: 'rio-label',
  template: `
    <label [id]="qaid">
      <ng-content></ng-content>
    </label>
  `
})
export class RioLabel {
  @Input() qaid: string;
};
