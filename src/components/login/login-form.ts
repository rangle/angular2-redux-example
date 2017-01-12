import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { NgModel } from '@angular/forms';

export interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'rio-login-form',
  template: `
    <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
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
          type="submit"
          [disabled]="form.invalid">
          Login
        </rio-button>
        <rio-button
          qaid="qa-clear-button"
          className="bg-red"
          type="reset"
          (click)="onReset()">
          Clear
        </rio-button>
      </rio-form-group>
    </form>
  `
})
export class RioLoginForm {
  @Input() isPending: boolean;

  @Input() hasError: boolean;

  @Output() login = new EventEmitter<LoginForm>();

  @ViewChildren(NgModel) models: QueryList<NgModel>;

  username: string;
  password: string;

  onReset() {
    this.username = '';
    this.password = '';

    if (this.models) {
      this.models.forEach(m => m.control.markAsUntouched());
    }
  }

  onSubmit(value) {
    this.models.forEach(m => m.control.markAsTouched());

    this.login.emit(value);
  }
}
