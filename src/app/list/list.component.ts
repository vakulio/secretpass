import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { GridListComponent } from './grid-list/grid-list/grid-list.component';
import { FbTimestampPipe } from '../shared/pipes/fb-Timestamp/fb-timestamp.pipe';

@Component({
  selector: 'secretpass-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputServiseComponent, GridListComponent, DatePipe, FbTimestampPipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private auth = inject(AngularFireAuth);
  private manager = inject(PasswordManagerService);
  clients: IServiceItem[] = [];
  user: firebase.User | null = null;
  constructor() {
    {
      this.auth.user.pipe(take(1)).subscribe((user) => {
        this.user = user;
      });
    }
  }

  ngOnInit(): void {
    this.manager.getUserClients().pipe(take(1)).subscribe((docs) => {
      const powerData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.clients = powerData;
    });
  }

  serviceName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  serviceAddress = new FormControl('', [Validators.minLength(3)]);

  serviceImg = new FormControl('', [Validators.minLength(3)]);

  serviceForm = new FormGroup({
    serviceName: this.serviceName,
    serviceImg: this.serviceImg,
    serviceAddress: this.serviceAddress,
  });

  cleanForm() {
    this.serviceForm.reset();
  }

  createNewData() {
    if (!this.user?.uid) {
      return;
    }
    const { serviceImg, serviceName, serviceAddress } = this.serviceForm.value;

    if (serviceImg && serviceName && serviceAddress) {
      const client: IServiceItem = {
        serviceName,
        imageUrl: serviceImg,
        uid: this.user?.uid,
        address: serviceAddress,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      this.manager
        .createClient(client)
        .then(() => {
          this.clients = [...this.clients, client]
          console.log('Success');
        })
        .catch((err) => console.log(err));
      this.cleanForm();
    }
  }
}
