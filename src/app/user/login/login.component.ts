import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'secretpass-login',
  templateUrl: './login.component.html',
  styles: [],
  standalone: true,
  imports: [NgIf, AlertComponent, FormsModule],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait!';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait!';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Some error. Please try again';
      return;
    }
    this.alertColor = 'green';
    this.alertMsg = 'Everything is right. You are logged in';
  }
}
