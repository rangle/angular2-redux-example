import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {select} from 'ng2-redux';
import {CounterActions} from '../actions';
import {ICounter} from '../store';

@Component({
  selector: 'counter-page',
  providers: [ CounterActions ],
  template: `
    <rio-container testid="counter" [size]=2 [center]=true>
      <h2 data-testid="counter-heading" id="qa-counter-heading"
        class="center caps">
        Counter
      </h2>

      <rio-counter
        [counter]="counter$ | async"
        (increment)="actions.increment()"
        (decrement)="actions.decrement()">
      </rio-counter>
    </rio-container>
  `
})
export class RioCounterPage {
  @select() private counter$: Observable<ICounter>;
  constructor(private actions: CounterActions) {}
}
