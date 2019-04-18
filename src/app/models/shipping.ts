export class Shipping {
    name: string;
    address: string;
    phno: number;

    constructor(shipping?) {
        this.name = shipping && shipping.name || "";
        this.address = shipping && shipping.address || "";
        this.phno = shipping && shipping.phno || "";
    }
}