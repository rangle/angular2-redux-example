import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {RioFormError} from './form-error';
import {RioFormModule} from './form.module';
import {configureTests} from '../../tests.configure';

describe('Component: Form Error', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioFormModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioFormError);
      fixture.detectChanges();
      done();
    });
  });

  it('should be hidden with visible is false',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.qaid = 'form-error-1';
        const compiled = fixture.debugElement.nativeElement;
        fixture.componentInstance.visible = false;
        fixture.detectChanges();
        expect(compiled.querySelector('div').getAttribute('class')
          .split(' ')).toContain('display-none');
        fixture.componentInstance.visible = true;
        fixture.detectChanges();
        expect(compiled.querySelector('div').getAttribute('class')
          .split(' ')).not.toContain('display-none');
      });
    }))
  );
});

