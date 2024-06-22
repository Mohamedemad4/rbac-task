import { CustomAppError } from "./CustomAppError";

export class AlreadyExistsError extends CustomAppError {
  constructor(message = "Already exists") {
    super(message, 400);
  }
}
