import { Component, Inject, ApplicationRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { bindActionCreators } from 'redux';
import { select, NgRedux } from 'ng2-redux';
import { CounterActions } from '../actions/counter';
import { Observable } from 'rxjs/Observable';
import { RioContainer, RioCounter } from '../components';
import { IAppState } from '../reducers';

@Component({
  selector: 'counter-page',
  providers: [ CounterActions ],
  directives: [ RioContainer, RioCounter ],
  pipes: [ AsyncPipe ],
  template: `
    <rio-container [size]=2 [center]=true>
      <h2 id="qa-counter-heading"
        class="center caps">
        Counter
      </h2>

      <rio-counter
        [counter$]="counter$"
        (increment)="actions.increment()"
        (decrement)="actions.decrement()">
      </rio-counter>
    </rio-container>
  `
})
export class RioCounterPage {
  @select(n => n.counter.get('count')) private counter$: Observable<number>;

  constructor(private actions: CounterActions,
    private ngRedux: NgRedux<IAppState>) { }
  
  increment() {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }
}
