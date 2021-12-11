import { CustomError } from '../custom-error';

export class BadRequestError extends CustomError {
    constructor(
        public message = 'There is something wrong with the request.',
        public statusCode = 400
    ) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
