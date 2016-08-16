import {
  NgModule
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RioAboutPage} from '../pages/about.page';
import {RioUiModule} from '../components/ui/ui.module';
import {RouterModule} from '@angular/router';

const ROUTES = [
  { path: '', component: RioAboutPage }
];

@NgModule({
  imports: [
    CommonModule,
    RioUiModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RioAboutPage
  ],
  exports: [
    RioAboutPage
  ]
})
export class RioAboutPageModule { }
