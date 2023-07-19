import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'secretpass-navbar',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  modal = inject(ModalService);
  auth = inject(AuthService);
  router = inject(Router);

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  toVault() {
    this.router.navigateByUrl('/secrets');
  }
}
