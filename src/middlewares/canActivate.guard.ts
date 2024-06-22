import { DI } from "../app";
import { NextFunction, Response } from "express";
import { TsRestRequest } from "@ts-rest/express";

import { User } from "#repositories/models/user.model";
import { SYSTEM_PERMISSIONS } from "#config/PERMISSIONS";
import { organizationContract } from "#contracts/organization.contract";

export const canActivate =
  (permissionsSlug: SYSTEM_PERMISSIONS) =>
  async (
    req: TsRestRequest<typeof organizationContract>,
    res: Response,
    next: NextFunction,
  ) => {
    const userRepo = DI.orm.em.getRepository(User);
    const allowedUserPermissions = (
      await userRepo.findPermissions(req.user.userId, req.params.orgId)
    )[0].map((p) => p.slug);

    if (allowedUserPermissions.includes(permissionsSlug)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
