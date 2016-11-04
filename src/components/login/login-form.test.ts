import {
  async,
  fakeAsync,
  inject,
  TestBed,
  tick,
  ComponentFixture,
} from '@angular/core/testing';

import {RioLoginForm} from './index';
import {RioLoginModule} from './login.module';
import {configureTests} from '../../tests.configure';

describe('Component: Login Form', () => {
  let fixture: ComponentFixture<RioLoginForm>;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [RioLoginModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(RioLoginForm);
      fixture.detectChanges();
      done();
    });
  });

  it('should create the component', fakeAsync(inject([], () => {
    fixture.whenStable().then(() => {
      const element = fixture.nativeElement;
      expect(element.querySelector('#qa-pending-alert')).toBeNull();
      expect(element.querySelector('#qa-alert')).toBeNull();
      expect(element.querySelector('#qa-uname-input')).not.toBeNull();
      expect(element.querySelector('#qa-uname-validation').className)
        .toContain('hide');
      expect(element.querySelector('#qa-password-input')).not.toBeNull();
      expect(element.querySelector('#qa-password-validation').className)
        .toContain('hide');
      expect(element.querySelector('#qa-login-button')).not.toBeNull();
      expect(element.querySelector('#qa-clear-button')).not.toBeNull();
      expect(fixture.componentInstance.onSubmit).toBeTruthy();
    });
  })));

  it('should display alert if the form hasError', fakeAsync(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.componentInstance.hasError = true;
      fixture.autoDetectChanges();
      const alert = fixture.nativeElement.querySelector('#qa-alert');
      expect(alert).not.toBeNull();
      expect(alert.innerText).toEqual('Invalid username and password');
    });
  })));

  it('should display alert if the form isPending', fakeAsync(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.componentInstance.isPending = true;
      fixture.detectChanges();
      tick();
      const alert = fixture.nativeElement.querySelector('#qa-pending');
      expect(alert).not.toBeNull();
      expect(alert.innerText).toEqual('Loading...');
    });
  })));

  it('should display name warning for invalid username',
    fakeAsync(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username = '';
        fixture.detectChanges();
        tick();
        const alert =
          fixture.nativeElement.querySelector('#qa-uname-validation');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Username is required.');
      });
    })
  ));

  it('should display password warning for invalid password',
    fakeAsync(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.password = '';
        fixture.detectChanges();
        tick();
        const alert = fixture.nativeElement
          .querySelector('#qa-password-validation');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Password is required.');
      });
    })
  ));

  it('should emit an event when the login button is clicked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username = 'user';
        fixture.componentInstance.password = 'pass';
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('#qa-login-button');
        button.click();

        fixture.componentInstance.onSubmit.subscribe(data => {
          expect(data).toBeDefined();
          expect(data.username).toEqual('user');
          expect(data.password).toEqual('pass');
        });
      });
    }))
  );

  it('should call reset when the clear button is clicked',
    fakeAsync(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username = 'user';
        fixture.componentInstance.password = 'pass';
        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.username).toEqual('user');
        expect(fixture.componentInstance.password).toEqual('pass');

        spyOn(fixture.componentInstance, 'reset').and.callThrough();
        const button = fixture.nativeElement.querySelector('#qa-clear-button');
        button.click();

        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.reset).toHaveBeenCalled();
        expect(fixture.componentInstance.username).toBeFalsy();
        expect(fixture.componentInstance.password).toBeFalsy();
      });
    }))
  );
});
