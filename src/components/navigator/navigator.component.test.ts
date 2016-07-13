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
import { RioNavigator } from './navigator.component';

describe('Component: Navigator', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => addProviders([RioNavigator]));
  
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioNavigator],
    (component: RioNavigator) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioNavigatorTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioNavigator));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  })));
});

@Component({
  selector: 'test',
  template: `
    <rio-navigator></rio-navigator>
  `,
  directives: [RioNavigator]
})
class RioNavigatorTestController { }

