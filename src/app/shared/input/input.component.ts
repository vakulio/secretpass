import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'secretpass-input',
  templateUrl: './input.component.html',
  styles: [],
  imports: [ReactiveFormsModule, CommonModule, NgIf, NgxMaskDirective],
  standalone: true,
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() format = '';
}
