import {
  async,
  inject
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioModal} from './modal.component';
import {TestBed} from '@angular/core/testing/test_bed';
import {RioModalModule} from './modal.module';

describe('Component: Modal', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RioModalModule
      ],
      declarations: [
        RioModalTestController
      ],
      providers: [
        RioModal
      ]
    });
    fixture = TestBed.createComponent(RioModalTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([RioModal],
    (component: RioModal) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
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
  `
})
class RioModalTestController {}

