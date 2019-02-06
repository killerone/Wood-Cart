import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.filteredProducts = this.products = products.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Product;
        })
      });
  }

  ngOnInit() {
    this.productService.getAll().subscribe(productArray => {
      this.products = productArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Product;
      })
    })
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p['title'].toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() { 
    this.subscription.unsubscribe(); 
  } 
}
