import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  save(uid, name, email) {
    return this.firestore.doc('/users/' + uid).set({
      name: name,
      email: email,
      isAdmin: false
    });
  }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.firestore.doc('/users/' + uid);
  }
}
