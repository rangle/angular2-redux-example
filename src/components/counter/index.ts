import { Component, Input } from '@angular/core';
import { RioButton } from '../button';

@Component({
  selector: 'rio-counter',
  template: `
    <div class="flex">
      <rio-button
        className="bg-black col-2"
        (onClick)="decrement()">
        -
      </rio-button>

      <div class="flex-auto flex-center center h1">
        {{ counter }}
      </div>

      <rio-button className="col-2"
        (onClick)="increment()">
        +
      </rio-button>
    </div>
  `,
  directives: [RioButton]
})
export class RioCounter {
  @Input() counter: number;
  @Input() increment: () => void;
  @Input() decrement: () => void;
};
