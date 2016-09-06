import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import {RioInput} from './input';
import {FormControl} from '@angular/forms';
import {RioFormModule} from './form.module';
import {configureTests} from '../../tests.configure';

describe('Component: Form Input', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [
          RioFormModule,
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioInput);
      fixture.detectChanges();
      done();
    });
  });

  it('should render the input with the correct property values',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.control = new FormControl('');
        fixture.componentInstance.qaid = 'input-1';
        fixture.componentInstance.placeholder = 'test placeholder';
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#input-1')
          .getAttribute('placeholder')).toBe('test placeholder');
        expect(compiled.querySelector('#input-1')
          .getAttribute('type')).toBe('text');
        fixture.componentInstance.inputType = 'password';
        fixture.detectChanges();
        expect(compiled.querySelector('#input-1')
          .getAttribute('type')).toBe('password');
      });
    })
  ));
});
