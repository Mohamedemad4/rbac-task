type ErrorStatusCodes = 400 | 401 | 402 | 403 | 404 | 500;
export class CustomAppError extends Error {
  public statusCode: ErrorStatusCodes;

  constructor(message: string, statusCode: ErrorStatusCodes) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomAppError.prototype);
  }
}
