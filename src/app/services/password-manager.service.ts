import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import IServiceItem from '../models/service.modal';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  public serviceCollection: AngularFirestoreCollection<IServiceItem>;
  private db = inject(AngularFirestore);
  private auth = inject(AngularFireAuth);

  constructor() {
    this.serviceCollection = this.db.collection('clients');
  }

  createClient(data: IServiceItem): Promise<DocumentReference<IServiceItem>> {
    return this.serviceCollection.add(data);
  }

  getUserClients() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        
       return this.db.collection('clients', (ref) => ref.where('uid', '==', user.uid)).snapshotChanges()
      })
    );
  }

  async deleteClient(client: IServiceItem) {
    try {
      await this.serviceCollection.doc(client.docID).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
