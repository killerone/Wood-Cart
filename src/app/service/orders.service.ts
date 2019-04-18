import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore, private cartService: CartService) { }

  async storeOrder(order) {
    console.log(order.shipping)
    const orderObj = {
      userId: order.userId,
      datePlaced: order.datePlaced,
      shipping: { name: order.shipping.name, address: order.shipping.address, phno: order.shipping.phno },
      items: order.items,
      feedBack: "",
      status: false
    };
    const result = await this.firestore.collection('/orders').add(orderObj);
    this.cartService.clearCart();
    return result;
  }

  getAll() {
    return this.firestore.collection("orders").snapshotChanges();
  }

  get(id) {
    return this.firestore.collection("orders").doc(id).valueChanges();
  }

  updateFeedback(id, feedback) {
    this.firestore.collection("orders").doc(id).update({ 'feedBack': feedback })
  }

  updateStatus(id) {
    this.firestore.collection("orders").doc(id).update({ 'status': true })
  }
}
