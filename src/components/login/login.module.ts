import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  RioLoginForm,
  RioLoginModal
} from '../index';
import {RioUiModule} from '../ui/ui.module';
import {RioModalModule} from '../modal/modal.module';
import {RioFormModule} from '../form/form.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    RioUiModule,
    RioModalModule,
    RioFormModule
  ],
  declarations: [
    RioLoginModal,
    RioLoginForm
  ],
  exports: [
    RioLoginModal
  ]
})
export class RioLoginModule { }
