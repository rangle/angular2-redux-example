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
import { RioLogo } from './index';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';


describe('Component: Logo', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioLogo]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioLogo],
    (component: RioLogo) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', injectAsync([], () => {
    return builder.createAsync(RioLogoTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioLogo));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rio-logo></rio-logo>
  `,
  directives: [RioLogo]
})
class RioLogoTestController {}

