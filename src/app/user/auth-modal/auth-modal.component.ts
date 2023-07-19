import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { TabComponent } from 'src/app/shared/tab/tab.component';
import { TabsContainerComponent } from 'src/app/shared/tabs-container/tabs-container.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'secretpass-auth-modal',
  templateUrl: './auth-modal.component.html',
  styles: [],
  standalone: true,
  imports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  modal = inject(ModalService);

  ngOnInit(): void {
    this.modal.register('auth');
  }

  ngOnDestroy(): void {
    this.modal.unregister('auth');
  }
}
