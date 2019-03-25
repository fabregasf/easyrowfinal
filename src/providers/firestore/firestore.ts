import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Client } from '../../interfaces/client';
import { Http } from '@angular/http';
/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  private clientCollection: AngularFirestoreCollection<Client>;

  constructor(
    public db: AngularFirestore
  ) {
    this.clientCollection = db.collection<Client>('clients');
  }

  getAllUsers(){
    return this.clientCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
        })
      )
  }

  getUser(key: string){
    return this.clientCollection.doc<Client>(key).valueChanges();
  }


  getQueue(place_id: number){
    return this.db.collection('clients', ref => (
      ref.where('place.id', '==', place_id)
    ))
    .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
        })
      )
  }
  
  saveChave(chave: any, senha: any){
     return new Promise((resolve, reject) => {
      var data = {
        key: chave,
        pass: senha
      };
 
      this.http.post('https://juville.com.br/easyrow/admin/fab/enviachave.php', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });    

  }

  saveUser(user: any, key=null){
    if (key) {
      return this.clientCollection.doc(key).update(user);
    } else {
      return this.clientCollection.add(user);
    }
  }

  removeUser(key: string){
    this.clientCollection.doc(key).delete();
  }
}
