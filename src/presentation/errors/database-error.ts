import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {

  constructor(
    public reason = 'Something went wrong connecting to the database.', 
    public statusCode = 500
  ) {
    super(reason);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
