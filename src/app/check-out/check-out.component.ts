import { Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { CartService } from './../service/cart.service';
import { Component, OnInit, } from '@angular/core';
@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;


  constructor(
    private cartService: CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
