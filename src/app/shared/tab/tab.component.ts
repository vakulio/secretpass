import { Component, Input } from '@angular/core';

@Component({
  selector: 'secretpass-tab',
  templateUrl: './tab.component.html',
  styles: [],
  standalone: true,
})
export class TabComponent {
  @Input() tabTitle = '';
  @Input() active = false;
}
