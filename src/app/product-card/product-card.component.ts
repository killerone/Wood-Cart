import { ProductService } from './../service/product.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  imageUrl;
  isAdmin;
  constructor(
    private cartService: CartService,
    private tostr: ToastrService,
    private storage: AngularFireStorage) {

    if (localStorage.getItem("isAdmin"))
      this.isAdmin = (localStorage.getItem("isAdmin") == 'true');
  }

  ngOnInit() {
    this.storage.ref(this.product.imgUrl).getDownloadURL().subscribe(a => {
      this.imageUrl = a
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.tostr.success('1 Product added succefully', 'Product added to cart..', {
    });
  }
}
