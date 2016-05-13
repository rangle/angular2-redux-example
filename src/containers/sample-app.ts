import { Component, ViewEncapsulation, ApplicationRef, OnDestroy }
from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../store/app-state';
import { SessionActions } from '../actions/session';
import { RioAboutPage } from './about-page';
import { RioCounterPage } from './counter-page';

import {
  RioButton,
  RioNavigator,
  RioNavigatorItem,
  RioLogo,
  RioLoginModal
} from '../components';

@Component({
  selector: 'rio-sample-app',
  directives: [
    ROUTER_DIRECTIVES, RioNavigator,
    RioNavigatorItem,
    RioLoginModal, RioLogo,
    RioButton
  ],
  pipes: [ AsyncPipe ],
  // Allow app to define global styles.
  encapsulation: ViewEncapsulation.None,
  styles: [ require('../styles/index.css') ],
  template: require('./sample-app.tmpl.html')
})
@RouteConfig([
  {
    path: '/counter',
    name: 'Counter',
    component: RioCounterPage,
    useAsDefault: true
  },
  {
    path: '/about',
    name: 'About',
    component: RioAboutPage
  }
])
export class RioSampleApp implements OnDestroy {
  private hasError$: Observable<boolean>;
  private isLoading$: Observable<boolean>;
  private loggedIn$: Observable<boolean>;
  private loggedOut$: Observable<boolean>;
  private userName$: Observable<string>;
  private unsubscribe: () => void;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    applicationRef: ApplicationRef,
    private sessionActions: SessionActions) {

    const session$: Observable<Map<string, any>>
      = ngRedux.select<Map<string, any>>('session');

    this.hasError$ = session$.map(s => !!s.get('hasError'));
    this.isLoading$ = session$.map(s => !!s.get('isLoading'));
    this.loggedIn$ = session$.map(s => !!s.get('token'));
    this.loggedOut$ = this.loggedIn$.map(loggedIn => !loggedIn);

    this.userName$ = session$.map(s => {
        return [
          s.getIn(['user', 'firstName'], ''),
          s.getIn(['user', 'lastName'], '')
         ].join(' ');
      });

    ngRedux.mapDispatchToTarget((dispatch) => {
      return {
        login: (credentials) => dispatch(
          this.sessionActions.loginUser(credentials)),
        logout: () => dispatch(
          this.sessionActions.logoutUser())
      };
    })(this);

    this.unsubscribe = ngRedux.subscribe(() => {
      applicationRef.tick();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
};
