import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {RioAlert} from '../alert/alert.component';
import {RioButton} from '../button/button.component';
import {RioLogo} from '../logo/logo.component';
import {RioContainer} from '../container/container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RioAlert,
    RioButton,
    RioLogo,
    RioContainer
  ],
  exports: [
    RioAlert,
    RioButton,
    RioLogo,
    RioContainer
  ]
})
export class RioUiModule { }
