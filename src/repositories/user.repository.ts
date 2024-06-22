import { EntityRepository } from "@mikro-orm/postgresql";
import { User } from "./models/user.model";
import { OrganizationUser } from "./relations/organization-user.relation";
import { OrganizationUserRole } from "./relations/organization-role-user.relation";

export class UserRepository extends EntityRepository<User> {
  async findOrgs(userId: string) {
    const userOrgs = await this.em.findAll(OrganizationUser, {
      where: { user: { id: userId } },
    });
    return userOrgs.map((u) => u.org);
  }

  async findRoles(userId: string, orgId: string) {
    const userRoles = await this.em.findAll(OrganizationUserRole, {
      where: { user: { id: userId }, org: { id: orgId } },
    });
    return userRoles.map((r) => r.role);
  }

  async findPermissions(userId: string, orgId: string) {
    const userRoles = await this.em.findAll(OrganizationUserRole, {
      where: { user: { id: userId }, org: { id: orgId } },
    });
    return userRoles.map((r) => r.role.permissions).flat();
  }
}
