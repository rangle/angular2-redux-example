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
import { RioFormError } from './form-error';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';

describe('Component: Form Error', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioFormError]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioFormError],
    (component: RioFormError) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', injectAsync([], () => {
    return builder.createAsync(RioFormErrorTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioFormError));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
        expect(query.componentInstance.visible).toBe(true);
        expect(query.componentInstance.qaid).toBe('test id');
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rio-form-error
      qaid="test id"
      [visible]="true"></rio-form-error>
  `,
  directives: [RioFormError]
})
class RioFormErrorTestController {

  private field1: Control;

  constructor(private builder: FormBuilder) {
    this.reset();
  }

  reset() {
    this.field1 = new Control('');
  }

}

