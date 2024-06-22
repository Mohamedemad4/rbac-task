import env from "#config/env";
import { orm } from "#config/db";
import { userRouter } from "#routes/user.routes";
import { userContract } from "#contracts/user.contract";

import { User } from "#repositories/models/user.model";
import { Organization } from "#repositories/models/organization.model";
import { Role } from "#repositories/models/role.model";
import { UserRepository } from "#repositories/user.repository";
import { OrganizationRepository } from "#repositories/organization.repoistory";
import { RoleRepository } from "#repositories/role.repository";
import { rootContract } from "#contracts/root.contract";
import { seed } from "#config/seeds";

import * as swaggerUi from "swagger-ui-express";
import { createExpressEndpoints } from "@ts-rest/express";
import { MikroORM, RequestContext } from "@mikro-orm/postgresql";
import express, { Express } from "express";
import { generateOpenApi } from "@ts-rest/open-api";

const app: Express = express();

export const DI = {} as {
  orm: MikroORM;
  userRepository: UserRepository;
  organizationRepository: OrganizationRepository;
  roleRepository: RoleRepository;
};

const openApiDocument = generateOpenApi(rootContract, {
  info: {
    title: "RBAC API",
    version: "1.0.0",
  },
});

export const init = (async () => {
  DI.orm = await orm;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.organizationRepository = DI.orm.em.getRepository(Organization);
  DI.roleRepository = DI.orm.em.getRepository(Role);

  if (env.NODE_ENV === "development") {
    const schema = DI.orm.getSchemaGenerator();
    await schema.ensureDatabase();
    await schema.updateSchema();

    await seed(DI.orm.em);
  }

  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  createExpressEndpoints(userContract, userRouter, app);

  app.listen(env.PORT, () => {
    console.log(`Started at http://localhost:${env.PORT}`);
  });
})();
