import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IServiceItem from '../models/service.modal';
import { map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService{
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
      switchMap(user => {
      
        if(!user) {
          return of([])
        }
        const query = this.serviceCollection.ref.where(
          'uid', '==', user.uid
        )

        return query.get()

      }),
      map(snapshot => (snapshot as QuerySnapshot<IServiceItem>).docs
      )
    )
  }

}
