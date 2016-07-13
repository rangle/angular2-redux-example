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
import { RioContainer } from './container.component';

describe('Component: Alert', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioContainer]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should set default size', inject([RioContainer],
    (component: RioContainer) => {
      expect(component.size).toBe(1);
    }));

  it('should set center', inject([RioContainer],
    (component: RioContainer) => {
      expect(component.center).toBe(false);
    }));

  it('should have the correct max-width',
    async(inject([], () => {
      return builder.createAsync(RioContainer)
        .then((fixture: ComponentFixture<any>) => {
          const compiled = fixture.debugElement.nativeElement;
          const allMaxWidthClasses =
            ['max-width-1', 'max-width-2', 'max-width-3', 'max-width-4'];
          const size_class = [
            {
              size: 1,
              class: 'max-width-1',
            },
            {
              size: 2,
              class: 'max-width-2',
            },
            {
              size: 3,
              class: 'max-width-3',
            },
            {
              size: 4,
              class: 'max-width-4',
            },
          ];

          size_class.map(item => {
            fixture.componentInstance.size = item.size;
            fixture.detectChanges();
            expect(compiled.querySelector('div')
              .getAttribute('class').split(' ')).toContain(item.class);
            allMaxWidthClasses.filter(bg_class => bg_class !== item.class)
              .map(bg_class_excluded => {
                expect(compiled.querySelector('div')
                  .getAttribute('class').split(' '))
                  .not.toContain(bg_class_excluded);
              });
          });
        });
    })
    ));

  it('should have class mx-auto only when center is true', () => {
    async(inject([], () => {
      return builder.createAsync(RioContainer)
        .then((fixture: ComponentFixture<any>) => {
          const compiled = fixture.debugElement.nativeElement;
          fixture.componentInstance.center = true;
          fixture.detectChanges();
          expect(compiled.querySelector('div')
            .getAttribute('class').split(' ')).toContain('mx-auto');
          fixture.componentInstance.center = false;
          fixture.detectChanges();
          expect(compiled.querySelector('div')
            .getAttribute('class').split(' ')).not.toContain('mx-auto');
        });
    }));
  });
});

