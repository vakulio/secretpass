import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { AuthModalComponent } from './user/auth-modal/auth-modal.component';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NavbarComponent,
    ListComponent,
    AuthModalComponent,
    AsyncPipe,
    NgIf, DatePipe
  ],
  selector: 'secretpass-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  auth = inject(AuthService);
  title = 'SecPass';
}
