import { InvalidParametersError } from '@common/errors';
import { Product } from '../product';

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
        this.validateQuantity();
    }

    validateQuantity() {
        if (this.quantity < 0) {
            throw new InvalidParametersError('Invalid quantity');
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
