import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioInput } from './input';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';

describe('Component: Form Input', () => {
  
  it('should render the input with the correct property values',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(RioInput)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.formControl = new Control('');
          fixture.componentInstance.qaid = 'input-1';
          fixture.componentInstance.placeholder = 'test placeholder';
          fixture.detectChanges();
          let compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('#input-1')
            .getAttribute('placeholder')).toBe('test placeholder');
          expect(compiled.querySelector('#input-1')
            .getAttribute('type')).toBe('text');
          fixture.componentInstance.inputType = 'password';
          fixture.detectChanges();
          expect(compiled.querySelector('#input-1')
            .getAttribute('type')).toBe('password');
        });
    })
  ));

});
