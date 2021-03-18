export abstract class CustomError extends Error {
  abstract statusCode: number;

  // message passed in instantiation for logging purposes
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
