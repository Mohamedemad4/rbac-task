import { MikroORM } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import env from "./env";
import { User } from "#repositories/models/user.model";
import { Organization } from "#repositories/models/organization.model";
import { OrganizationUser } from "#repositories/relations/organization-user.relation";
import { OrganizationUserRole } from "#repositories/relations/organization-role-user.relation";
import { Permission } from "#repositories/models/permissions.model";
import { Role } from "#repositories/models/role.model";

export const orm = MikroORM.init({
  entities: [
    User,
    Role,
    Organization,
    OrganizationUser,
    OrganizationUserRole,
    Permission,
  ],
  persistOnCreate: true,
  entitiesTs: ["../repositories/"],
  metadataProvider: TsMorphMetadataProvider,
  clientUrl: env.PG_URL,
});
