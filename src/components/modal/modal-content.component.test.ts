import {
  TestBed,
  inject
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioModalContent} from './modal-content.component';
import {RioModalModule} from './modal.module';
import {configureTests} from '../../tests.configure';

describe('Component: Modal Content', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [
          RioModalModule
        ],
        declarations: [
          RioModalContentTestController
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioModalContentTestController);
      fixture.detectChanges();
      done();
    });
  });

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

