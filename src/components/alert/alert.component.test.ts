import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioAlert } from './alert.component';

describe('Component: Alert', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioAlert]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should default to info status', inject([RioAlert],
    (component: RioAlert) => {
      expect(component.status).toBe('info');
    }));

  it('should have the correct background class',
    async(inject([], () => {
      return builder.createAsync(RioAlert)
        .then((fixture: ComponentFixture<any>) => {
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
      return builder.createAsync(RioAlert)
        .then((fixture: ComponentFixture<any>) => {
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

