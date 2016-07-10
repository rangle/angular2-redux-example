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
import { RioLoginModal } from './index';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

describe('Component: Login Modal', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => addProviders([
    disableDeprecatedForms(),
    provideForms(),
    RioLoginModal
  ]));

  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    })
  );

  it('should inject the component', inject([RioLoginModal],
    (component: RioLoginModal) => {
      expect(component).toBeTruthy();
  }));


  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioLoginModal)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        let element = fixture.nativeElement;
        expect(element.querySelector('rio-modal-content')).not.toBeNull();
        expect(element.querySelector('h1').innerText).toEqual('Login');
        expect(element.querySelector('rio-login-form')).not.toBeNull();
        expect(fixture.componentInstance.onSubmit).toBeTruthy();
      });
  })));

  it('should emit an event when handleSubmit is called',
    async(inject([], () => {
      return builder.createAsync(RioLoginModal)
        .then((fixture: ComponentFixture<any>) => {
          let login = { username: 'user', password: 'pass' };
          fixture.componentInstance.handleSubmit(login);
          fixture.componentInstance.onSubmit.subscribe(data => {
            expect(data).toBeDefined();
            expect(data.username).toEqual('user');
            expect(data.password).toEqual('pass');
          });
        });
    }))
  );

});
