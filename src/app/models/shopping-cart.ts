import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
import { AngularFireStorage } from '@angular/fire/storage';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  imgUrl;

  constructor(private itemsMap: { [productId: number]: ShoppingCartItem }, private storage: AngularFireStorage) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      const item = itemsMap[productId] as any;
      const path = item.payload.doc.data().product.imgUrl;
      this.storage.ref(path).getDownloadURL().subscribe(a => {
        this.imgUrl = a;
        this.items.push(new ShoppingCartItem(item.payload.doc.data().product, item.payload.doc.data().quantity,
          item.payload.doc.data().product.id, this.imgUrl));
      });
    }
  }

  public getQuantity(product: Product) {
    let quant = 0;
    this.items.forEach(element => {
      if (element.key === product.id) {
        quant = element.quantity;
      }
    });
    return quant;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const each in this.items) {
      count += this.items[each].quantity;
    }
    return count;
  }
}

