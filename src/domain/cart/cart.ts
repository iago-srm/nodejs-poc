import { Customer, CartItem, USD } from '@domain';
import { InvalidParametersError } from '@common/errors';

interface CartConstructorParams {
    id: string;
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
        args.items &&
            args.totalQuantity &&
            this.validateQuantities(args.items, args.totalQuantity);
        this.id = args.id || '';
        this.totalPrice = args.totalPrice || new USD(0);
        this.totalQuantity = args.totalQuantity || 0;
        if (args.items && args.items.length) {
            args.items.forEach((item) => this.insertProducts(item));
        } else {
            this.items = [];
        }
    }

    // insertManyItems(items: CartItem[]) {
    //     items.forEach(item => this.insertProducts(item));
    // }
    validateQuantities(items: CartItem[], quantity: number) {
        let totalQuantity = 0;
        items.forEach((item) => {
            totalQuantity += item.getQuantity();
        });
        if (totalQuantity !== quantity) {
            throw new InvalidParametersError(
                'Item quantities and total quantity do not match.'
            );
        }
    }
    insertProducts(item: CartItem) {
        if (!this.items) {
            this.items = [];
        }
        const existingCartItem = this.items.find(
            (i) => i.getProduct().id === item.getProduct().id
        );
        if (existingCartItem) {
            const oldQuantity = existingCartItem.getQuantity();
            existingCartItem.setQuantity(item.getQuantity() + oldQuantity);
        } else {
            this.items.push(item);
        }
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        let newTotalPrice = 0;
        for (let item of this.items) {
            newTotalPrice +=
                item.getProduct().getPrice().getValue() * item.getQuantity();
        }
        this.totalPrice = new USD(newTotalPrice);
    }

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
