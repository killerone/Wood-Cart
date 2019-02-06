import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { CategoriesService } from './../../service/categories.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: { id: string, name: string }[];
  product = {};
  id;

  constructor(
    private categorieService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private tostr: ToastrService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).then(p => this.product = p.data());
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
    if (this.id) {
      this.productService.update(this.id, product);
      this.tostr.success('Product updated succefully', 'Product updated', {
        timeOut: 2500
      });
    }
    else {
      this.productService.add(product);
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
}
