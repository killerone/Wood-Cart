import { Product } from './../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  product: Product;
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  add(product: Product, image) {
    const path = 'image/' + (+ new Date()) + '.jpg';
    this.storage.upload(path, image).snapshotChanges().subscribe(p => {
      product.imgUrl = p.ref.fullPath
      if (p.bytesTransferred === p.totalBytes) {
        this.firestore.collection("products").add(product);
        console.log(p.ref.fullPath);
      }
    })
  }

  update(productId, product: Product, image) {
    if (image == null) {
      return this.firestore.doc("products/" + productId).update(product);
    }
    else {
      product.imgUrl = image;
      this.firestore.doc("products/" + productId).update(product);
      alert("Updated");
    }
  }

  getAll() {
    return this.firestore.collection("products").snapshotChanges();
  }

  get(productId) {
    return this.firestore.collection("products").doc(productId).valueChanges();
  }



  delete(productId) {
    return this.firestore.doc("products/" + productId).delete();
  }

  async getImageUrl(path) {
    await this.storage.ref(path).getDownloadURL();
  }
}
