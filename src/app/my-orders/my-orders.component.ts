import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../service/orders.service';
import { Order } from '../models/order';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  product = true;
  delivery = false;
  uId: string;
  orders: Order[] = [];

  constructor(private orderService: OrdersService, private authService: AuthService, private title: Title) {
    this.authService.user$.subscribe(user => this.uId = user.uid);
  }

  ngOnInit() {
    this.title.setTitle("My Orders");
    this.orders = []
    try {
      this.orderService.getAll().subscribe(orderArray => {
        orderArray.map(order => {
          if (order.payload.doc.get('userId') == this.uId) {
            this.orders.push({
              userId: order.payload.doc.get('userId'),
              shipping: order.payload.doc.get('shipping'),
              items: order.payload.doc.get('items'),
              datePlaced: order.payload.doc.get('datePlaced'),
              status: order.payload.doc.get('status'),
              orderId: order.payload.doc.id,
            } as Order)
          }
        })
      })
    }
    catch (exp) {
    }

  }

  showTab(tab) {
    this.product = tab == "product" ? true : false;
    this.delivery = tab == "delivery" ? true : false;
  }
}
