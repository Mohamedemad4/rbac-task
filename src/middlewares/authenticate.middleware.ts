import env from "#config/env";
import { rootContract } from "#contracts/root.contract";

import { TsRestRequest } from "@ts-rest/express";
import { verify, decode } from "jsonwebtoken";
import { NextFunction, Response } from "express";

export const authenticate = (
  req: TsRestRequest<typeof rootContract>,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization ?? "".replace("Bearer ", "");
  if (token == "" || !token) return res.sendStatus(401);
  if (verify(token, env.PRIVATE_KEY)) {
    req.user = decode(token) as UserClaims;
    next();
  } else {
    res.sendStatus(401);
  }
};
