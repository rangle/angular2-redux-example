import {
  async,
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioForm } from './form';
import {
  REACTIVE_FORM_DIRECTIVES,
  disableDeprecatedForms,
  provideForms,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';

describe('Component: Form', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => addProviders([
    disableDeprecatedForms(),
    provideForms(),
    RioForm
  ]));

  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioForm],
    (component: RioForm) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioFormTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioForm));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
        expect(query.componentInstance.onSubmit).toBeTruthy();
        expect(query.componentInstance.group).toBeTruthy();
      });
  })));

  it('should emit event when onSubmit is invoked', async(inject([], () => {
    return builder.createAsync(RioFormTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioForm));
        query.componentInstance.onSubmit.subscribe(c => {
          expect(c).toBeDefined();
        });
        query.nativeElement.querySelector('button').click();
      });
  })));

});

@Component({
  selector: 'test',
  template: `
    <rio-form
      [group]="group">
      <input
        [formControl]="field1">
      <button type="submit">submit</button>
      </rio-form>
  `,
  directives: [REACTIVE_FORM_DIRECTIVES, RioForm],
})
class RioFormTestController {
  private group: FormGroup;
  private field1: FormControl;
  constructor(private builder: FormBuilder) {
    this.field1 = new FormControl('test value');
    this.group = this.builder.group({
      field1: this.field1,
    });
  }
}

