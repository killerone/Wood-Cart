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
  show;
  constructor(private cartService: CartService, private title: Title) { }

  async ngOnInit() {
    this.title.setTitle("Cart");
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(cart =>{
      this.show = cart.items.length? true:false;
      if(cart.itemsMap.length)
        this.show = true;
      else
        this.show = false;
    })
  }

  clearCart() {
    this.cartService.clearCart()
  }

  deleteItem(product){
    this.cartService.deleteFromCart(product);
  }

  
}
