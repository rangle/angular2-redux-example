import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {RioModal} from './modal.component';
import {RioModalContent} from './modal-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RioModal,
    RioModalContent
  ],
  exports: [
    RioModal,
    RioModalContent
  ]
})
export class RioModalModule { }
