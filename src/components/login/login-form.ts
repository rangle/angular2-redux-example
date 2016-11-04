import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  NgForm,
  Validators
} from '@angular/forms';

@Component({
  selector: 'rio-login-form',
  template: `
    <form (ngSubmit)="handleSubmit()">
      <rio-alert
        qaid="qa-pending"
        testid="alert-pending"
        status='info'
        *ngIf="isPending">Loading...</rio-alert>
      <rio-alert
        qaid="qa-alert"
        testid="alert-error"
        status='error'*ngIf="hasError">
        Invalid username and password
      </rio-alert>

      <rio-form-group
        testid="login-username">
        <rio-label qaid="qa-uname-label">Username</rio-label>
        <rio-input
          required
          name="username"
          qaid="qa-uname-input"
          inputType='text'
          placeholder='Username'
          [(ngModel)]="username"
          #usernameModel="ngModel"></rio-input>
        <rio-form-error
          qaid="qa-uname-validation"
          [visible]="
            usernameModel.control.touched && !usernameModel.control.valid">
          Username is required.
        </rio-form-error>
      </rio-form-group>

      <rio-form-group
        testid="login-password">
        <rio-label qaid="qa-password-label">Password</rio-label>
        <rio-input
          required
          name="password"
          qaid="qa-password-input"
          inputType='password'
          placeholder='Password'
          [(ngModel)]="password"
          #passwordModel="ngModel"></rio-input>
        <rio-form-error
          qaid="qa-password-validation"
          [visible]="
            passwordModel.control.touched && !passwordModel.control.valid">
          Password is required.
        </rio-form-error>
      </rio-form-group>

      <rio-form-group
        testid="login-submit">
        <rio-button
          qaid="qa-login-button"
          className="mr1"
          type="submit">
          Login
        </rio-button>
        <rio-button
          qaid="qa-clear-button"
          className="bg-red"
          type="reset"
          (onClick)="reset()">
          Clear
        </rio-button>
      </rio-form-group>
    </form>
  `
})
export class RioLoginForm {
  @Input() isPending: boolean;
  @Input() hasError: boolean;
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();

  @ViewChild(NgForm) form: NgForm;

  username: string;
  password: string;

  constructor() {
    this.reset();
  }

  handleSubmit() {
    this.onSubmit.emit(this.form.value);
  }

  reset() {
    this.username = '';
    this.password = '';
  }
};
