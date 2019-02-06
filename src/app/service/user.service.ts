import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  save(user: firebase.User) {
    this.firestore.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email,
      isAdmin: true
    });
  }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.firestore.doc('/users/' + uid);
  }
}
