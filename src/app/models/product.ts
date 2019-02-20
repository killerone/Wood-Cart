export class Product {
    id: string;
    category: string;
    imgUrl: string;
    price: number;
    title: string;

    constructor(p: Product) {
        this.id = p.id;
        this.category = p.category;
        this.imgUrl = p.imgUrl;
        this.price = p.price;
        this.title = p.title;
    }
}