import { initServer } from "@ts-rest/express";
import { userContract } from "#contracts/user.contract";
import { UserService } from "#services/user.service";
import { catchAppErrorsHTTP } from "#utils/catchAppErrorsHttp";
import { authenticate } from "#middlewares/authenticate.middleware";
const s = initServer();

const userService = new UserService();

export const userRouter = s.router(userContract, {
  register: async ({ body: { name, email, password } }) =>
    catchAppErrorsHTTP(userService.register(name, email, password)),
  login: async ({ body: { email, password } }) =>
    catchAppErrorsHTTP(userService.login(email, password)),
  refreshToken: async ({ body: { refresh_token } }) =>
    catchAppErrorsHTTP(userService.refresh(refresh_token)),
  listOrganizations: {
    middleware: [authenticate],
    handler: async ({ req }) =>
      catchAppErrorsHTTP(userService.listOrganizations(req.user.userId)),
  },
});
