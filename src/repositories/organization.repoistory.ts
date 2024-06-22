import { EntityRepository } from "@mikro-orm/postgresql";
import { Organization } from "./models/organization.model";
import { DI } from "../app";
import { OrganizationUser } from "./relations/organization-user.relation";
import { randomUUID } from "crypto";
import { OrganizationUserRole } from "./relations/organization-role-user.relation";

export class OrganizationRepository extends EntityRepository<Organization> {
  // async findUsers() {}
  // async findUsersWithRoles() {}

  async assignUserToOrg(orgId: string, userId: string) {
    DI.orm.em.create(
      OrganizationUser,
      {
        org: { id: orgId },
        user: { id: userId },
        id: randomUUID(),
      },
      { partial: true },
    );
  }

  async assignRoleToUser(orgId: string, userId: string, roleId: string) {
    DI.orm.em.create(
      OrganizationUserRole,
      {
        org: { id: orgId },
        user: { id: userId },
        role: { id: roleId },
        id: randomUUID(),
      },
      { partial: true },
    );
  }
}
