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
import { RioModal } from './modal';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';


describe('Component: Modal', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioModal]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioModal],
    (component: RioModal) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioModalTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioModal));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  })));
});

@Component({
  selector: 'test',
  template: `
    <rio-modal></rio-modal>
  `,
  directives: [RioModal]
})
class RioModalTestController {}

