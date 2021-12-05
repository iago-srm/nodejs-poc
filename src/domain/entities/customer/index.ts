import { Cart } from "../cart";

interface CustomerConstructorParams {
    id: string;
    cart: Cart;
}

export class Customer {
    public id: string;
    private cart: Cart;

    constructor(args: Partial<CustomerConstructorParams>) {
        this.id = args.id || "";
        this.cart = args.cart || new Cart({});
    }

    isOwnCart(cart: Cart) {
        return cart.id === this.cart.id;
    }
}