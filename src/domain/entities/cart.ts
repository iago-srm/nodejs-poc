import { Product, Customer } from '@domain';

interface CartConstructorParams {
    id: string,
    customer: Customer,
    items: CartItem[];
}
interface CartItemConstructorParams {
    product: Product;
    quantity: number;
}

export class CartItem {
    private product: Product;
    private quantity: number;

    constructor(args: CartItemConstructorParams) {
        this.quantity = args.quantity;
        this.product = args.product;
    }
}

export class Cart {

    public id: string;
    private customer: Customer;
    private totalPrice: number;
    private totalQuantity: number;
    private items: CartItem[];
    
    constructor(args: Partial<CartConstructorParams>) {
        this.id = args.id || "";
        this.customer = args.customer || {};
        this.items = args.items || [];
    }

    insertProducts(products: Product[]) {
        // products.forEach(p => this.products.push(p));
        // this.amount += products.length;
    }
}

/**
 * a function for calculating the total cost;
user's taste preference detection
determining whether an item is in the shopping cart, etc.
 */