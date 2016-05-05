import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioAlert } from './index';

describe('Component: Alert', () => {
  // let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioAlert]);
  // beforeEach(inject([TestComponentBuilder],
  //   function (tcb: TestComponentBuilder) {
  //     builder = tcb;
  //   }));

  it('should default to info status', inject([RioAlert],
    (component: RioAlert) => {
      expect(component.status).toBe('info');
    }));

  it('should have the correct background class',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(RioAlert)
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
              .getAttribute('class')).toContain(item.class);
            allBgClasses.filter(bg_class => bg_class !== item.class)
              .map(bg_class_excluded => {
                expect(compiled.querySelector('#alert-1')
                  .getAttribute('class')).not.toContain(bg_class_excluded);
              });
          });
        });
    })
    ));
});

