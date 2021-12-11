import { InvalidCartItemQuantityError } from '@common/errors';
import { Product } from '../product';

interface CartItemConstructorParams {
    product: Product;
    quantity: number;
}

export class CartItem {
    private product: Product;
    private quantity: number;

    constructor(args: Partial<CartItemConstructorParams>) {
        this.quantity = args.quantity || 0;
        this.product = args.product || new Product({});
        this.validateQuantity();
    }

    validateQuantity() {
        if (this.quantity < 0) {
            throw new InvalidCartItemQuantityError();
        }
    }

    getProduct() {
        return this.product;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(newQuantity: number) {
        this.quantity = newQuantity;
    }
}
