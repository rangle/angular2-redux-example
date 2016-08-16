import { Routes } from '@angular/router';
import { RioCounterPage } from '../pages';
import {RioAboutPage} from '../pages/about.page';

export const SAMPLE_APP_ROUTES: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'counter'
  },
  {
    path: 'counter',
    component: RioCounterPage
  },
  {
    path: 'about',
    component: RioAboutPage
  }
];
