import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Renderer2, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'secretpass-input-service',
  templateUrl: './input-service.component.html',
  styles: [],
  imports: [ReactiveFormsModule, CommonModule, NgIf, NgxMaskDirective],
  standalone: true,
})
export class InputServiseComponent {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() format = '';
  @Input() labelFor = '';
  private renderer = inject(Renderer2);
  passwordVisibility = false;
  toggleInputType(): void {
		this.passwordVisibility = !this.passwordVisibility;
		this.type = this.passwordVisibility ? 'text' : 'password';
		window.requestAnimationFrame(() => {
			this.renderer.selectRootElement(`#${this.labelFor}`).focus();
		});
	}
}
