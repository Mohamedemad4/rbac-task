import { MikroORM } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import env from "./env";
import { User } from "#repositories/models/user.model";
import { Organization } from "#repositories/models/organization.model";
import { Permission } from "#repositories/models/permissions.model";
import { Role } from "#repositories/models/role.model";
import { UserOrgAssignment } from "#repositories/relations/user-org-assignment.relation";
import { UserRoleAssignment } from "#repositories/relations/user-role-assignment.relation";

export const orm = MikroORM.init({
  entities: [
    User,
    Role,
    Organization,
    UserOrgAssignment,
    UserRoleAssignment,
    Permission,
  ],
  persistOnCreate: true,
  entitiesTs: ["../repositories/"],
  metadataProvider: TsMorphMetadataProvider,
  clientUrl: env.PG_URL,
});
