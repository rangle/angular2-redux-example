import {
  async,
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioLabel } from './label';

describe('Component: Navigator', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => addProviders([RioLabel]));
  
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioLabel],
    (component: RioLabel) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioLabelTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioLabel));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  })));

    it('should set the id to qaid value', async(inject([], () => {
    return builder.createAsync(RioLabelTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioLabel));
        expect(query.nativeElement.querySelector('label')
          .getAttribute('id')).toBe('test-1');
      });
  })));
});

@Component({
  selector: 'test',
  template: `
    <rio-label
      qaid="test-1"></rio-label>
  `,
  directives: [RioLabel]
})
class RioLabelTestController { }

