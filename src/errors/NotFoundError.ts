import { CustomAppError } from "./CustomAppError";

export class NotFoundError extends CustomAppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
