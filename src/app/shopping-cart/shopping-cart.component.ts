import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  constructor(private cartService: CartService, private title: Title) { }

  async ngOnInit() {
    this.title.setTitle("Cart");
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart()
  }
}
