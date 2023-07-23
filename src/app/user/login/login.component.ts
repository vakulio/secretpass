import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'secretpass-login',
  templateUrl: './login.component.html',
  styles: [],
  standalone: true,
  imports: [NgIf, AlertComponent, ReactiveFormsModule, InputComponent],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  enterForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

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
      if (
        this.enterForm.controls.email.value &&
        this.enterForm.controls.password.value
      ) {
        await this.auth.signInWithEmailAndPassword(
          this.enterForm.controls.email.value,
          this.enterForm.controls.password.value
        );
      }
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
