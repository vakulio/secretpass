import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import IServiceItem from 'src/app/models/service.modal';
import { FbTimestampPipe } from 'src/app/shared/pipes/fb-Timestamp/fb-timestamp.pipe';

@Component({
  selector: 'secretpass-grid-list[clientSites]',
  standalone: true,
  imports: [CommonModule, FbTimestampPipe, DatePipe],
  templateUrl: './grid-list.component.html',
  styles: [],
})
export class GridListComponent {
  @Input() clientSites: IServiceItem[] = [];
}
