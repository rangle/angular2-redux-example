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
import { RioInput } from './input';
import {
  disableDeprecatedForms,
  provideForms, 
  FormControl
} from '@angular/forms';

describe('Component: Form Input', () => {
  beforeEach(() => addProviders([
    disableDeprecatedForms(),
    provideForms()
  ]));

  it('should render the input with the correct property values',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(RioInput)
        .then((fixture: ComponentFixture<any>) => {
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
