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
        const arr = docs.map(action => {
          const data = action.payload.doc.data() as IServiceItem;
          const docID = action.payload.doc.id
          return {...data, docID}
        })
       this.clients = arr
      });
  }

  serviceName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  servicePassword = new FormControl('', [Validators.minLength(3)]);

  serviceImg = new FormControl('', [Validators.minLength(3)]);

  serviceForm = new FormGroup({
    serviceName: this.serviceName,
    serviceImg: this.serviceImg,
    servicePassword: this.servicePassword,
  });

  cleanForm() {
    this.serviceForm.reset();
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

    if (serviceImg && serviceName && servicePassword) {
      const client: IServiceItem = {
        serviceName,
        imageUrl: serviceImg,
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
