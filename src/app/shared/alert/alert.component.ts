import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'secretpass-alert',
  templateUrl: './alert.component.html',
  styles: [],
  standalone: true,
  imports: [NgClass],
})
export class AlertComponent {
  @Input() color = 'blue';

  get bgColor() {
    return `bg-${this.color}-400`;
  }
}
