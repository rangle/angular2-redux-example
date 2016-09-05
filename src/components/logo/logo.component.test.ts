import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {RioLogo} from './index';
import {RioUiModule} from '../ui/ui.module';
import {configureTests} from '../../tests.configure';

describe('Component: Logo', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioUiModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioLogo);
      fixture.detectChanges();
      done();
    });
  });

  it('should set the image location',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.LogoImage = 'data:image/gif;base64,fake';
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('img').getAttribute('src'))
          .toBe('data:image/gif;base64,fake');
      });
    })));
});
