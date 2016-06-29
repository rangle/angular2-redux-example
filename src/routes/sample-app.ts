import { RioCounterPage } from '../containers/counter-page';
import { RioAboutPage } from '../containers/about-page';

export const SAMPLE_APP_ROUTES = [{
  path: '',
  component: RioCounterPage
}, {
  path: 'about',
  component: RioAboutPage
}];
