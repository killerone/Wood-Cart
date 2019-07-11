
import { Title } from '@angular/platform-browser';
import { ProductService } from './../service/product.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { take } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: string
  product: Product;
  imgURL;
  qty;
  cart$;
  isAdmin;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private storage: AngularFireStorage,
    private cartService: CartService,
    private tostr: ToastrService,
    private title:Title) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.title.setTitle("Product Details")
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe((p: Product) => {
        this.product = new Product(p);
        this.product.id = this.id;
        this.storage.ref(this.product.imgUrl).getDownloadURL().subscribe(a => {
          this.imgURL = a;
        });
      });
    }

    if(localStorage.getItem("isAdmin")){
      this.isAdmin = (localStorage.getItem("isAdmin") == "true");
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.tostr.success('1 Product added succefully', 'Product added to cart..', {
    });
  }

  buyNow(){
    
  }
}
