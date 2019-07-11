import { Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { CartService } from './../service/cart.service';
import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private title: Title) { }

  async ngOnInit() {
    this.title.setTitle("Checkout");
    this.cart$ = await this.cartService.getCart();
  }

}
