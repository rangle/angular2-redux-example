import { RouterConfig } from '@angular/router';

import { RioCounterPage } from '../containers/counter-page';
import { RioAboutPage } from '../containers/about-page';

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
