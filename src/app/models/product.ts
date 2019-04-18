export class Product {
    id: string;
    category: string;
    imgUrl: string;
    price: number;
    title: string;
    desc: string;
    brand: string;
    colour: string;
    material: string;
    height: string;
    width: string;

    constructor(p?: Product) {
        this.id = p && p.id || "";
        this.category = p && p.category || "";
        this.imgUrl = p && p.imgUrl || "";
        this.price = p && p.price || null;
        this.title = p && p.title || "";
        this.desc = p && p.desc || "";
        this.brand = p && p.brand || "";
        this.colour = p && p.colour || "";
        this.material = p && p.material || "";
        this.height = p && p.height || "";
        this.width = p && p.width || "";
    }
}