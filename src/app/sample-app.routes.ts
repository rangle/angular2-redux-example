import {RouterConfig} from '@angular/router';
import {
  RioCounterPage,
  RioAboutPage
} from '../pages';

export const SAMPLE_APP_ROUTES: RouterConfig = [{
  pathMatch: 'full',
  path: '',
  redirectTo: 'counter'
}, {
  path: 'counter',
  component: RioCounterPage
}, {
  path: 'about',
  component: RioAboutPage
}];
