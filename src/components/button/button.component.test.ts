import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';

import {RioButton} from './button.component';
import {RioUiModule} from '../../components/ui/ui.module';
import {RioFormModule} from '../../components/form/form.module';
import {configureTests} from '../../tests.configure';

let fixture;

describe('Component: Button', () => {
  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [
          RioFormModule,
          RioUiModule,
        ],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioButton);
      fixture.detectChanges();
      done();
    });
  });

  it('should invoke onClick when button is clicked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        spyOn(fixture.componentInstance, 'onClick');
        fixture.componentInstance.qaid = 'button-1';
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        compiled.querySelector('#button-1').click();
        expect(fixture.componentInstance.onClick).toHaveBeenCalled();
      });
    }))
  );

  it('should emit event when click is invoked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.click.subscribe(e => {
          expect(typeof e.stopPropagation).toEqual('function');
        });
        fixture.componentInstance.onClick({stopPropagation: () => {}});
      });
    }))
  );

  it('should render the button with the correct class applied',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.qaid = 'button-1';
        fixture.componentInstance.className = 'test-class';
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#button-1')
          .getAttribute('class').split(' ')).toContain('test-class');
      });
    })
    )
  );
});
