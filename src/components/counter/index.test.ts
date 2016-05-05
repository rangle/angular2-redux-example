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
import { RioCounter } from './index';

class CounterActions {
  increment() {
    return 'counter plus one;';
  }
  decrement() {
    return 'counter minus one';
  }
}

describe('Component: Counter', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioCounter]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should call increment counter function',
    async(inject([RioCounter], (component: RioCounter) => {
      const CounterActions_ = new CounterActions;
      spyOn(CounterActions_, 'increment').and.returnValue('counter plus one');
      component.increment = CounterActions_.increment;
      component.increment();
      expect(CounterActions_.increment).toHaveBeenCalled();
    }))
  );

  it('should call decrement counter function',
    async(inject([RioCounter], (component: RioCounter) => {
      const CounterActions_ = new CounterActions;
      spyOn(CounterActions_, 'decrement').and.returnValue('counter plus one');
      component.decrement = CounterActions_.decrement;
      component.decrement();
      expect(CounterActions_.decrement).toHaveBeenCalled();
    }))
  );

  it('should show the current count',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(RioCounter)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.qaid = 'counter-1';
          fixture.componentInstance.counter = -1;
          fixture.detectChanges();
          let compiled = fixture.debugElement.nativeElement;
          expect(compiled
            .querySelector('div.flex div.flex-auto.flex-center.center.h1')
            .innerText).toBe('-1');
        });
    }))
  );

});
