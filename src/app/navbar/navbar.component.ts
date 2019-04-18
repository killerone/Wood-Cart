import { AppUser } from './../models/app-user';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  cart$: Observable<ShoppingCart>;
  products: Product[];
  filteredProducts: Product[];
  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private cartService: CartService,
    private productService: ProductService) {
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {

    this.getUserData();


    this.cart$ = await this.cartService.getCart();
    this.productService.getAll().subscribe(productArray => {
      this.products = productArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Product;
      })
    })
  }

  getUserData() {
    if (this.afAuth.authState) {
      this.auth.appUser$.subscribe(appUser => {
        if (appUser) {
          this.appUser = appUser;
          if (this.appUser.isAdmin)
            localStorage.setItem('isAdmin', (this.appUser.isAdmin).toString());
        }
      });
    }
  }

  search(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p['title'].toLowerCase().includes(query.toLowerCase())) :
      null;

      console.log(this.filteredProducts)
  }

}
