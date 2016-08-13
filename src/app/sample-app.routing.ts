import {
  Routes,
  RouterModule
} from '@angular/router';
import {SAMPLE_APP_ROUTES} from './sample-app.routes';

const appRoutes: Routes = SAMPLE_APP_ROUTES;

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
