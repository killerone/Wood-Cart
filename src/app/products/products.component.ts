import { CartService } from './../service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ProductService } from './../service/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  category: string;
  price: string;
  productSubscription: Subscription;
  categorytSubscription: Subscription;
  cart$: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) {
  }

  async ngOnInit() {

    this.cart$ = (await this.cartService.getCart());

    this.route.paramMap.subscribe(param => {
      this.category = param.get("category")

      this.productSubscription = this.productService.getAll().subscribe(productArray => {
        productArray.map(item => {
          if (item.payload.doc.get("category") == this.category) {
            this.products.push(new Product({
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Product))
          }
        });

        this.route.queryParamMap.subscribe(param => {
          this.price = param.get("price");

          this.applyFilter(this.price);
        })
      });
    })


  }

  private applyFilter(price) {
    this.filteredProducts = []
    if (price) {
      const prices = (price.split('-')).map(a => { return parseInt(a) });
      this.filteredProducts = this.products.filter(p => { if (p.price > prices[0] && p.price < prices[1]) return p });
    } else
      this.filteredProducts = this.products;
  }
  ngOnDestroy() {

  }
}
