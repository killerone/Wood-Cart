import { CartService } from './../service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  category: string;
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

    this.productSubscription = this.productService.getAll().subscribe(productArray => {
      this.products = productArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Product;
      });

      this.categorytSubscription = this.route.queryParamMap.subscribe(params => {
        this.category = params.get("category");
        this.applyFilter();
      })
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
