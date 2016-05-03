import { Component } from '@angular/core';

@Component({
  selector: 'rio-form-group',
  template: `
    <div class="py2">
      <ng-content></ng-content>
    </div>
  `
})
export class RioFormGroup {};
