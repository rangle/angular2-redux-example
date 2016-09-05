import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioFormGroup} from './form-group';
import {RioFormModule} from './form.module';
import {RioSampleAppModule} from '../../app/sample-app.module';
import {configureTests} from '../../tests.configure';

describe('Component: Navigator', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioFormModule],
        declarations: [RioFormGroupTestController],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioFormGroupTestController);
      fixture.detectChanges();
      done();
    });
  });

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
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
      qaid="test-1">
    </rio-form-group>
  `
})
class RioFormGroupTestController { }

