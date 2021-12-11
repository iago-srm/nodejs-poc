export type FieldError = {
    field?: string;
    message: string;
};

export type ServerError = { errors: FieldError[] };

export abstract class CustomError extends Error {
    abstract HTTPstatusCode?: number;

    // message passed in instantiation for logging purposes
    constructor(message: string) {
        super(message);

        // Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors(): FieldError[] {
        return [{ message: this.message }];
    }
}
