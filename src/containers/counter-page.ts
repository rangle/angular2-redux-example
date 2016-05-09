import { Component, Inject, ApplicationRef } from '@angular/core';
import { bindActionCreators } from 'redux';
import { AsyncPipe } from '@angular/common';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { CounterActions } from '../actions/counter';
import { RioContainer, RioCounter } from '../components';
import { IAppState } from '../store/app-state';

@Component({
  selector: 'rio-counter-page',
  directives: [RioContainer, RioCounter],
  pipes: [AsyncPipe],
  template: `
    <rio-container [size]=2 [center]=true>
      <h2 id="qa-counter-heading"
        class="center caps">
        Counter
      </h2>

      <rio-counter
        [counter]="counter$ | async"
        [increment]="increment"
        [decrement]="decrement">
      </rio-counter>
    </rio-container>
  `
})
export class RioCounterPage {
  private counter$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private counterActions: CounterActions) {

    this.counter$ = this.ngRedux.select(n => n.counter.get('count'));
  }

  private increment = () => {
    this.ngRedux.dispatch(this.counterActions.increment());
  };

  private decrement = () => {
    this.ngRedux.dispatch(this.counterActions.decrement());
  };
}
