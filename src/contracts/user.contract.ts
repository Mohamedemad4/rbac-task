import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const userContract = c.router({
  register: {
    method: "POST",
    path: "/api/user/register",
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
    responses: {
      201: z.object({}),
      400: z.object({ message: z.string() }),
    },
  },
  login: {
    method: "POST",
    path: "/api/user/login",
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    responses: {
      200: z.object({
        access_token: z.string(),
        refresh_token: z.string(),
      }),
    },
  },
  refreshToken: {
    method: "POST",
    path: "/api/user/refresh",
    body: z.object({
      refresh_token: z.string(),
    }),
    responses: {
      200: z.object({
        access_token: z.string(),
        // TODO: optionally return a new refresh_token if keep_me_signed_in is checked.
        refresh_token: z.string().optional(),
      }),
    },
  },
  listOrganizations: {
    method: "GET",
    headers: z.object({ authorization: z.string() }),
    path: "/api/user/organizations",
    responses: {
      200: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      ),
    },
  },
});
