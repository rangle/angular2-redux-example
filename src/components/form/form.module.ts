import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  RioFormGroup,
  RioFormError,
  RioInput,
  RioLabel
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RioFormGroup,
    RioFormError,
    RioLabel,
    RioInput
  ],
  exports: [
    RioFormGroup,
    RioFormError,
    RioLabel,
    RioInput
  ]
})
export class RioFormModule { }
