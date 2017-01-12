import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rio-button',
  template: `
    <button
      [attr.data-testid]="testid"
      [id]="qaid"
      [disabled]="disabled"
      (click)="onClick($event)"
      type="{{type || 'button'}}"
      class="btn btn-primary {{className}}">
      <ng-content></ng-content>
    </button>
  `
})
export class RioButton {
  @Input() className: string;
  @Input() type: string;
  @Input() qaid: string;
  @Input() testid: string;
  @Input() disabled: boolean;

  @Output() click = new EventEmitter<MouseEvent>();

  private onClick(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    this.click.emit(event);
  }
}
