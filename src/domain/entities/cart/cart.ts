import { Customer, CartItem, USD } from '@domain';

interface CartConstructorParams {
    id: string;
    // customer: Customer;
    totalQuantity: number;
    totalPrice: USD;
    items: CartItem[];
}

export class Cart {

    public id: string;
    private totalPrice: USD;
    private totalQuantity: number;
    private items: CartItem[];
    
    constructor(args: Partial<CartConstructorParams>) {
        this.id = args.id || "";
        // this.customer = args.customer || {};
        this.totalPrice = args.totalPrice || new USD('0');
        this.totalQuantity = args.totalQuantity || 0;
        this.items = args.items || [];
    }

    insertProducts(item: CartItem) {
        const existingCartItem = this.items.find(i => i.getProduct().id === item.getProduct().id);
        if(existingCartItem) {
            const oldQuantity = existingCartItem.getQuantity();
            existingCartItem.setQuantity(item.getQuantity());
        } else {
            this.items.push(item);
        }
    }

    // getCustomer() {
    //     return this.customer;
    // }

    getTotalPrice() {
        return this.totalPrice;
    }

    getTotalQuantity() {
        return this.totalQuantity;
    }

    getItems() {
        return this.items;
    }
}

/**
 * a function for calculating the total cost;
user's taste preference detection
determining whether an item is in the shopping cart, etc.
 */