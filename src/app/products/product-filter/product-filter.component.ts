import { CategoriesService } from './../../service/categories.service';
import { Category } from './../../models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[];

  @Input('category') category;  
  constructor(
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getAll().subscribe(categoryArray => {
      this.categories = categoryArray.map(items => {
        return {
          id: items.payload.doc.id,
          ...items.payload.doc.data()
        } as Category
      })
    })
  }

}
