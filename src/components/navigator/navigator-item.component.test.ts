import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioNavigatorItem } from './navigator-item.component';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';


describe('Component: Navigator Item', () => {
  beforeEachProviders(() => [RioNavigatorItem]);

  it('should render the button with the correct classes applied',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(RioNavigatorItem)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.mr = true;
          fixture.componentInstance.ml = true;
          fixture.detectChanges();
          let compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('div').getAttribute('class'))
            .toBe('truncate mr2 ml2');
          fixture.componentInstance.mr = false;
          fixture.detectChanges();
          expect(compiled.querySelector('div').getAttribute('class'))
            .toBe('truncate ml2');
        });
    })
  ));
});
