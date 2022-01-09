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
        args.cart && this.isOwnCart(args.cart?.id);
    }

    isOwnCart(cartId: string) {
        if (cartId !== this.cart.id)
            throw new CartDoesNotBelongToCustomerError();
    }

    getCart() {
        return this.cart;
    }
}
