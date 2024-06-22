import { CustomAppError } from "./CustomAppError";

export class UnauthenticatedError extends CustomAppError {
  constructor(message = "unauthenticated") {
    super(message, 403);
  }
}
