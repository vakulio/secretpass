import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputServiseComponent } from '../shared/input-service/input-service.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { PasswordManagerService } from '../services/password-manager.service';
import IServiceItem from '../models/service.modal';
import { AES } from 'crypto-js';
import { ListItemComponent } from './listItem/list-item.component';

@Component({
  selector: 'secretpass-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputServiseComponent,
    ListItemComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private auth = inject(AngularFireAuth);
  private manager = inject(PasswordManagerService);
  clients: IServiceItem[] = [];
  user: firebase.User | null = null;
  isEncrypt = false;
  constructor() {
    {
      this.auth.user.pipe(take(1)).subscribe((user) => {
        this.user = user;
      });
    }
  }

  ngOnInit(): void {
    this.manager
      .getUserClients()
      .pipe()
      .subscribe((docs) => {
        const arr = docs.map((action) => {
          const data = action.payload.doc.data() as IServiceItem;
          const docID = action.payload.doc.id;
          return { ...data, docID };
        });
        this.clients = arr;
      });
  }

  serviceName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  servicePassword = new FormControl('', [
    Validators.minLength(3),
    Validators.required,
  ]);

  serviceImg = new FormControl('', [Validators.minLength(3)]);

  serviceForm = new FormGroup({
    serviceName: this.serviceName,
    serviceImg: this.serviceImg,
    servicePassword: this.servicePassword,
  });

  cleanForm() {
    this.serviceForm.reset();
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomCharacter() {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomIndex = this.getRandomInt(0, chars.length - 1);
    return chars.charAt(randomIndex);
  }

  generatePassword() {
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += this.getRandomCharacter();
    }
    this.servicePassword.setValue(password);
  }

  encryptPassword(password: string) {
    const secretKey = '44H7YaZxYmuX0VxxvT5njenuzFC5shLU';
    const codedPassword = AES.encrypt(password, secretKey).toString();
    return codedPassword;
  }

  createNewData() {
    if (!this.user?.uid) {
      return;
    }
    const { serviceImg, serviceName, servicePassword } = this.serviceForm.value;
    let image = serviceImg;
    if (serviceImg === '' || serviceImg === null || serviceImg === undefined) {
      image = `https://source.unsplash.com/random?sig=${this.getRandomInt(
        0,
        1000
      )}`;
    }
    if (image && serviceName && servicePassword) {
      const client: IServiceItem = {
        serviceName,
        imageUrl: image,
        uid: this.user?.uid,
        password: this.encryptPassword(servicePassword),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      this.manager
        .createClient(client)
        .then(() => {
          this.clients = [...this.clients, client];
          console.log('Success');
        })
        .catch((err) => console.log(err));
      this.cleanForm();
    }
  }
}
