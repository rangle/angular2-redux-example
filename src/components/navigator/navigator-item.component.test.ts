import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {RioNavigatorItem} from './navigator-item.component';
import {RioNavigatorModule} from './navigator.module';
import {configureTests} from '../../tests.configure';

describe('Component: Navigator Item', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioNavigatorModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioNavigatorItem);
      fixture.detectChanges();
      done();
    });
  });

  it('should render the button with the correct classes applied',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.mr = true;
        fixture.componentInstance.ml = true;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('div').getAttribute('class'))
          .toBe('truncate mr2 ml2');
        fixture.componentInstance.mr = false;
        fixture.detectChanges();
        expect(compiled.querySelector('div').getAttribute('class'))
          .toBe('truncate ml2');
      });
    })
  ));
});
