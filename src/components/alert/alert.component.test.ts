import {
  async,
  inject
} from '@angular/core/testing';
import {RioAlert} from './alert.component';
import {TestBed} from '@angular/core/testing/test_bed';
import {RioUiModule} from '../ui/ui.module';

describe('Component: Alert', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RioUiModule
      ]
    });
    fixture = TestBed.createComponent(RioAlert);
    fixture.detectChanges();
  });

  it('should default to info status', async(inject([], () => {
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.status).toBe('info');
    });
  })));

  it('should have the correct background class',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.qaid = 'alert-1';
        const compiled = fixture.debugElement.nativeElement;
        const allBgClasses = ['bg-blue', 'bg-yellow', 'bg-green', 'bg-red'];
        const status_class = [
          {
            status: 'info',
            class: 'bg-blue',
          },
          {
            status: 'warning',
            class: 'bg-yellow',
          },
          {
            status: 'success',
            class: 'bg-green',
          },
          {
            status: 'error',
            class: 'bg-red',
          },
        ];

        status_class.map(item => {
          fixture.componentInstance.status = item.status;
          fixture.detectChanges();
          expect(compiled.querySelector('#alert-1')
            .getAttribute('class').split(' ')).toContain(item.class);
          allBgClasses.filter(bg_class => bg_class !== item.class)
            .map(bg_class_excluded => {
              expect(compiled.querySelector('#alert-1')
                .getAttribute('class').split(' '))
                .not.toContain(bg_class_excluded);
            });
        });
      });
    })
  ));

  it('should have class white if status is info or error',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.qaid = 'alert-1';
        const compiled = fixture.debugElement.nativeElement;
        const allStatuses = ['info', 'warning', 'success', 'error'];
        const whiteTextStatuses = ['info', 'error'];
        allStatuses.map(status => {
          fixture.componentInstance.status = status;
          fixture.detectChanges();
          if (whiteTextStatuses.indexOf(status) >= 0) {
            expect(compiled.querySelector('#alert-1')
              .getAttribute('class').split(' ')).toContain('white');
          } else {
            expect(compiled.querySelector('#alert-1')
              .getAttribute('class').split(' '))
              .not.toContain('white');
          }
        });
      });
    })));
});

