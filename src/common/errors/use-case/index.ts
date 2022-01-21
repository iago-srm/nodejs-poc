import { CustomError } from '../custom-error';
import { UseCaseErrorMessages } from '@common/locales';

export class ProductNotFoundError extends CustomError {
    HTTPstatusCode = 400;
    constructor() {
        super(UseCaseErrorMessages.PRODUCT_NOT_FOUND);
    }
}

export class CartNotFoundError extends CustomError {
    HTTPstatusCode = 400;
    constructor() {
        super(UseCaseErrorMessages.CART_NOT_FOUND);
    }
}
