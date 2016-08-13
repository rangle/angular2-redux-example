import {
  async,
  inject
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioNavigator } from './navigator.component';
import {TestBed} from '@angular/core/testing/test_bed';

describe('Component: Navigator', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RioNavigator,
        RioNavigatorTestController
      ],
      providers: [
        RioNavigator
      ]
    });
    fixture = TestBed.createComponent(RioNavigatorTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([RioNavigator],
    (component: RioNavigator) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
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
  `
})
class RioNavigatorTestController { }

