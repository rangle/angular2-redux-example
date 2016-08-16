import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  RioForm,
  RioFormGroup,
  RioFormError,
  RioInput,
  RioLabel
} from './index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RioForm,
    RioFormGroup,
    RioFormError,
    RioLabel,
    RioInput
  ],
  exports: [
    RioForm,
    RioFormGroup,
    RioFormError,
    RioLabel,
    RioInput
  ]
})
export class RioFormModule { }
