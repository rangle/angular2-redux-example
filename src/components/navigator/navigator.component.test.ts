import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RioNavigator} from './navigator.component';
import {RioFormModule} from '../form/form.module';
import {RioNavigatorModule} from './navigator.module';
import {configureTests} from '../../tests.configure';

describe('Component: Navigator', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [
          RioNavigatorModule,
        ],
        declarations: [
          RioNavigatorTestController
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioNavigatorTestController);
      fixture.detectChanges();
      done();
    });
  });

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

