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
import { Component, provide } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioCounterPage } from './counter-page';
import { CounterActions } from '../actions/counter';
import {NgRedux} from 'ng2-redux';
import {fromJS} from 'immutable';
import { counterReducer  as counter } from '../reducers/counter';
import { combineReducers } from 'redux';
describe('Container: Counter', () => {
  let builder: TestComponentBuilder;


  beforeEachProviders(() => [RioCounterPage, CounterActions, provide(NgRedux, {
    useFactory: () => {
      let ngRedux = new NgRedux(null);
      ngRedux.configureStore(combineReducers<any>({ counter }), {});
      return ngRedux;
    }
  })]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('Should not explode', inject([RioCounterPage],
    (component: RioCounterPage) => {
      component.increment();


    }));

  it('should get initial counter state',
    async(inject([], () => {
      return builder
        .overrideTemplate(RioCounterPage, `<div>{{counter$ | async}}</div>`)
        .createAsync(RioCounterPage)
        .then((fixture: ComponentFixture<RioCounterPage>) => {
          const compiled = fixture.debugElement.nativeElement;
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(compiled.querySelector('div')).toHaveText('0');
          });

        });
    })));
  
  it('should subscribe to state', async(inject([], () => {
      return builder
        .overrideTemplate(RioCounterPage, `<div>{{counter$ | async}}</div>`)
        .createAsync(RioCounterPage)
        .then((fixture: ComponentFixture<RioCounterPage>) => {
          const compiled = fixture.debugElement.nativeElement;
          fixture.componentInstance.increment();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(compiled.querySelector('div')).toHaveText('1');
          });

        });
    })));



});

