import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart; 

  constructor(
    private cartService: CartService,
    private tostr: ToastrService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.tostr.success('1 Product added succefully', 'Product added to cart..', {
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    this.tostr.error('1 Product remove succefully', 'Product removed from cart..', {
    });
  }

}
