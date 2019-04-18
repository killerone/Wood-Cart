import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart,datePalced?,orderId?) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.product.title,
          imgUrl: i.product.imgUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }

}