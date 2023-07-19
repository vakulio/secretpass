import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';
import { InputComponent } from 'src/app/shared/input/input.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'secretpass-register',
  templateUrl: './register.component.html',
  styles: [],
  imports: [InputComponent, AlertComponent, ReactiveFormsModule, NgIf],
  standalone: true
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';
  inSubmission = false;

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      this.auth.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.error(error);

      this.alertMsg = 'Some error. Please try again';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success!';
    this.alertColor = 'green';
  }
}
