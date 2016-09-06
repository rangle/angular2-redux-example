import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioModal} from './modal.component';
import {RioModalModule} from './modal.module';
import {configureTests} from '../../tests.configure';

describe('Component: Modal', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [
          RioModalModule,
        ],
        declarations: [
          RioModalTestController
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioModalTestController);
      fixture.detectChanges();
      done();
    });
  });

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

