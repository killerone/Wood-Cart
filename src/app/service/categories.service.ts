import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories;
  constructor(private firestore: AngularFirestore) {
  }

  getAll() {
    return this.firestore.collection("categories").snapshotChanges();
  }
}
