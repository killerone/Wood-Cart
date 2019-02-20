import { AppUser } from './../models/app-user';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private cartService: CartService) {
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }
}
