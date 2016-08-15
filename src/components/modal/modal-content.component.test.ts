import {
  inject
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioModalContent} from './modal-content.component';
import {TestBed} from '@angular/core/testing/test_bed';
import {RioModalModule} from './modal.module';

describe('Component: Modal Content', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RioModalModule
      ],
      declarations: [
        RioModalContentTestController
      ],
      providers: [
        RioModalContent
      ]
    });
    fixture = TestBed.createComponent(RioModalContentTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([RioModalContent],
    (component: RioModalContent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(RioModalContent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rio-modal-content></rio-modal-content>
  `
})
class RioModalContentTestController {}

