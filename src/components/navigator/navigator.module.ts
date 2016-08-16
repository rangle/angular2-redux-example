import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  RioNavigator,
  RioNavigatorItem
} from './index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RioNavigator,
    RioNavigatorItem
  ],
  exports: [
    RioNavigator,
    RioNavigatorItem
  ]
})
export class RioNavigatorModule { }
