import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(
    private cartService: CartService,
    private tostr: ToastrService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.tostr.success('1 Product added succefully', 'Product added to cart..', {
    });
  }
}
