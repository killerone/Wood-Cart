import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore, private cartService: CartService) { }

  async storeOrder(order) {
    const orderObj = {
      userId: order.userId,
      datePlaced: order.datePlaced,
      shipping: order.shipping,
      items: order.items
    };
    const result = await this.firestore.collection('/orders').add(orderObj);
    this.cartService.clearCart();
    return result;
  }
}
