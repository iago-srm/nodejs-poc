import { USD } from '../currency';
import { InvalidParametersError } from '@common/errors';

export interface ProductConstructorParams {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    specialOffer: string;
    discount: number;
    price: USD;
}

export class Product {
    public id: string;
    private name: string;
    private description: string;
    private image: string;
    private category: string;
    private specialOffer: string;
    private discount: number;
    private price: USD;

    constructor(args: Partial<ProductConstructorParams>) {
        args.discount && this.validateDiscount(args.discount);

        this.id = args.id || '';
        this.name = args.name || '';
        this.description = args.description || '';
        this.image = args.image || '';
        this.category = args.category || '';
        this.specialOffer = args.specialOffer || '';
        this.discount = args.discount || 0;
        this.price = args.price || new USD(0);
    }

    validateDiscount(discount: number) {
        if (discount > 100)
            throw new InvalidParametersError(
                'Discount value cannot be greater than 100.'
            );
    }

    getPrice() {
        return this.price;
    }

    getDiscount() {
        return this.discount;
    }

    getDescription() {
        return this.description;
    }
}
