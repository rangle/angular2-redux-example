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
import { RioFormGroup } from './form-group';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';


describe('Component: Navigator', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioFormGroup]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioFormGroup],
    (component: RioFormGroup) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioFormGroupTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioFormGroup));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  })));

});

@Component({
  selector: 'test',
  template: `
    <rio-form-group
      qaid="test-1"></rio-form-group>
  `,
  directives: [RioFormGroup]
})
class RioFormGroupTestController { }

