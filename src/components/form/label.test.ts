import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioLabel} from './label';
import {RioFormModule} from './form.module';
import {RioSampleAppModule} from '../../app/sample-app.module';
import {configureTests} from '../../tests.configure';

describe('Component: Navigator', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioFormModule],
        declarations: [
          RioLabelTestController
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioLabelTestController);
      fixture.detectChanges();
      done();
    });
  });

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(RioLabel));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  })));

    it('should set the id to qaid value', async(inject([], () => {
      fixture.whenStable().then(() => {
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
      qaid="test-1">
    </rio-label>
  `
})
class RioLabelTestController { }

