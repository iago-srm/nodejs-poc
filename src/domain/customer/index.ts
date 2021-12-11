import { Cart } from '../cart';
import { CartDoesNotBelongToCustomerError } from '@common/errors';

interface CustomerConstructorParams {
    id: string;
    cart: Cart;
}

export class Customer {
    public id: string;
    private cart: Cart;

    constructor(args: Partial<CustomerConstructorParams>) {
        this.id = args.id || '';
        this.cart = args.cart || new Cart({});
    }

    isOwnCart(cart: Cart) {
        if (cart.id !== this.cart.id)
            throw new CartDoesNotBelongToCustomerError();
        return true;
    }

    getCart() {
        return this.cart;
    }
}
