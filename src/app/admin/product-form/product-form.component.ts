import { Product } from './../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { CategoriesService } from './../../service/categories.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: { id: string, name: string }[];
  product: Product;
  id;
  public imagePath;
  imgURL: any;
  imgPath: string;
  constructor(
    private categorieService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private tostr: ToastrService,
    private storage: AngularFireStorage) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe((p: Product) => {
        this.product = new Product(p);
        this.imgPath = this.product.imgUrl
        this.storage.ref(this.product.imgUrl).getDownloadURL().subscribe(a => {
          this.imgURL = a;
          console.log(this.imgURL)
        });
      });
    }
    else { this.product = new Product(); }
  }

  ngOnInit() {
    this.categorieService.getAll().subscribe(actionArray => {
      this.categories = actionArray.map(item => {
        return ({
          id: item.payload.doc.id,
          name: item.payload.doc.get("name")
        })
      })
    });
  }

  save(product) {
    console.log(product);
    if (this.id) {
      // console.log(this.imagePath[0]);
      if (this.imagePath = null) {
        this.productService.update(this.id, product, null);
      }
      else { this.productService.update(this.id, product, this.imagePath); }
      this.tostr.success('Product updated succefully', 'Product updated', {
        timeOut: 2500
      });
    }
    else {
      this.productService.add(product, this.imagePath[0]);
      this.tostr.success('Product added succefully', 'Product added', {
        timeOut: 2500
      });
    }
    this.router.navigate(['/admin/products']);
  }


  delete() {
    if (confirm("Sure you want to delete this product??")) {
      this.productService.delete(this.id);
      this.tostr.error('Product deleted succefully', 'Product deleted', {
        timeOut: 2500
      });
      this.router.navigate(['/admin/products']);
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
