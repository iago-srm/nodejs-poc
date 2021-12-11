import { CustomError } from '../custom-error';
import { DomainErrorMessages } from '@common/locales';

export class InvalidParametersError extends CustomError {
    HTTPstatusCode = 400;
    constructor(message) {
        super(message);
    }
}

export class InvalidCartItemQuantityError extends CustomError {
    HTTPstatusCode = 400;
    constructor() {
        super(DomainErrorMessages.INVALID_CART_ITEM_QUANTITY);
    }
}

export class InconsistentCartQuantitiesError extends CustomError {
    HTTPstatusCode = 400;
    constructor() {
        super(DomainErrorMessages.INCONSISTENT_CART_QUANTITIES);
    }
}
