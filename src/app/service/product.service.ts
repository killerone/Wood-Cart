import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  add(product) {
    this.firestore.collection("products").add(product);
  }

  getAll() {
    return this.firestore.collection("products").snapshotChanges();
  }

  get(productId) {
    return this.firestore.collection("products").doc(productId).valueChanges();
  }

  update(productId, product) {
    return this.firestore.doc("products/" + productId).update(product);
  }

  delete(productId) {
    return this.firestore.doc("products/" + productId).delete();
  }
}
