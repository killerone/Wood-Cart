import { Shipping } from './../models/shipping';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../service/orders.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping: Shipping
  userSubscription: Subscription
  userId: string;

  @Input('cart') cart: ShoppingCart;
  constructor(
    private router: Router,
    private orderService: OrdersService,
    private tostr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.shipping = new Shipping();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    // console.log(this.shipping);
    // const ship = new Shipping(this.shipping)

    console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.id]);

    this.tostr.success('Order place succefully', 'Order placed.', {
      timeOut: 2500
    });
  }
}
