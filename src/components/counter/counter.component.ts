import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ICounter } from '../../store';

@Component({
  selector: 'rio-counter',
  template: `
    <div class="flex">
      <rio-button
        className="bg-black col-2"
        (onClick)="decrement.emit()"
        testid="counter-decrementButton">
        -
      </rio-button>

      <div 
        data-testid="counter-result"
        class="flex-auto flex-center center h1">
        {{ counter.counter }}
      </div>

      <rio-button className="col-2"
        (onClick)="increment.emit()"
        testid="counter-incrementButton">
        +
      </rio-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioCounter {
  @Input() counter: ICounter;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
};
