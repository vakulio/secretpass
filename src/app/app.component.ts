import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NavbarComponent,
    ListComponent
  ],
  selector: 'secretpass-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SecPass';
}
