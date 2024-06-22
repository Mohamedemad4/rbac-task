import { CustomAppError } from "./CustomAppError";

export class BadRequestError extends CustomAppError {
  constructor(message: string) {
    super(message, 400);
  }
}
