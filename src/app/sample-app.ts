import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import { createEpicMiddleware } from 'redux-observable';

import { IAppState, rootReducer } from '../store';
import { SessionEpics } from '../epics/session.epics';
import { middleware, enhancers, reimmutify } from '../store';

@Component({
  selector: 'rio-sample-app',
  // Allow app to define global styles.
  encapsulation: ViewEncapsulation.None,
  styles: [ require('../styles/index.css') ],
  template: require('./sample-app.html')
})
export class RioSampleApp {
  @select(['session', 'hasError']) hasError$: Observable<boolean>;
  @select(['session', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['session', 'user', 'firstName']) firstName$: Observable<string>;
  @select(['session', 'user', 'lastName']) lastName$: Observable<string>;
  @select(s => !!s.session.token) loggedIn$: Observable<boolean>;
  @select(s => !s.session.token) loggedOut$: Observable<boolean>;

  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private epics: SessionEpics) {

    const enh = (__DEV__ && devTools.isEnabled()) ?
      [ ... enhancers, devTools.enhancer({
        deserializeState: reimmutify,
      }) ] :
      enhancers;

    middleware.push(createEpicMiddleware(this.epics.login));

    ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
    ngReduxRouter.initialize();
  }
};
