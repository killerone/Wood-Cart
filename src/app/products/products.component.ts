import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
  }


  ngOnInit() {
    this.productService.getAll().subscribe(productArray => {
      this.products = productArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Product;
      });

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })
    });
  }
}
