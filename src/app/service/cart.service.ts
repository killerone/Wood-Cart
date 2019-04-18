import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore,private storage: AngularFireStorage) { }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.firestore.collection('cart').doc(cartId).collection('items').snapshotChanges().pipe(take(1))
      .subscribe(products => {
        products.map(productItem =>
          this.firestore.collection('cart').doc(cartId).collection('items').doc(productItem.payload.doc.id).delete()
        );
      });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const Cart = this.firestore.collection('cart').doc(cartId).collection('items').snapshotChanges()
      .pipe(map(x => new ShoppingCart(x as any,this.storage)
      ));
    return Cart;
  }

  private getItem(cartId: string, productId: string) {
    return this.firestore.doc("/cart/" + cartId + "/items/" + productId);
  }

  private create() {
    return this.firestore.collection("cart").add({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.id);
      return result.id;

    } return cartId;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const items = this.getItem(cartId, product.id);
    items.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item.payload.exists) {
        const quantity = item.payload.get('quantity') + change;

        if (quantity === 0)
          items.delete();
        else
          items.update({ product: { category: product.category, id: product.id, imgUrl: product.imgUrl, price: product.price, title: product.title }, quantity: item.payload.get('quantity') + change });
      } else {
        items.set({ product: { category: product.category, id: product.id, imgUrl: product.imgUrl, price: product.price, title: product.title }, quantity: 1 });
      }
    });
  }
}
