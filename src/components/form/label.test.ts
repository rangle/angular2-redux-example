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
import { RioLabel } from './label';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';

describe('Component: Form Label', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioLabel]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioLabel],
    (component: RioLabel) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', injectAsync([], () => {
    return builder.createAsync(RioLabelTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioLabel));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rio-label></rio-label>
  `,
  directives: [RioLabel]
})
class RioLabelTestController {}

