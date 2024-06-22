import { EntityRepository } from "@mikro-orm/postgresql";
import { Organization } from "./models/organization.model";
import { randomUUID } from "crypto";
import { User } from "./models/user.model";
import { Role } from "./models/role.model";
import { UserOrgAssignment } from "./relations/user-org-assignment.relation";
import { UserRoleAssignment } from "./relations/user-role-assignment.relation";

export class OrganizationRepository extends EntityRepository<Organization> {
  async findOrg(orgId: string) {
    return await this.findOneOrFail({ id: orgId }, { populate: ["*"] });
  }
  async findUserRoles(orgId: string, userId: string) {
    const roleAssignments = await this.em.find(UserRoleAssignment, {
      org: await this.findOneOrFail({ id: orgId }),
      user: await this.em.findOneOrFail(User, { id: userId }),
    });
    return roleAssignments.map((p) => p.role);
  }

  async findUsersWithRoles(orgId: string) {
    const org = await this.findOneOrFail({ id: orgId });
    return org.userRoleAssignments;
  }

  async assignUserToOrg(orgId: string, userId: string) {
    const org = await this.findOneOrFail({ id: orgId });
    org.userOrgAssignment.add(
      this.em.create(UserOrgAssignment, {
        id: randomUUID(),
        org,
        user: await this.em.findOneOrFail(User, { id: userId }),
      }),
    );

    const user = await this.em.findOneOrFail(User, { id: userId });
    user.organizations.add(org);
  }

  async removeUserFromOrg(orgId: string, userId: string) {
    const user = await this.em.findOneOrFail(User, { id: userId });
    const org = await this.findOneOrFail({ id: orgId });
    org.userOrgAssignment.remove(
      await this.em.findOneOrFail(UserOrgAssignment, { user: { id: userId } }),
    );

    org.userRoleAssignments.remove(
      await this.em.find(UserRoleAssignment, { user: { id: userId } }),
    );
    user.organizations.remove(org);
  }

  async assignRoleToUser(orgId: string, userId: string, roleId: string) {
    const org = await this.findOneOrFail({ id: orgId });
    org.userRoleAssignments.add(
      this.em.create(UserRoleAssignment, {
        id: randomUUID(),
        org,
        role: await this.em.findOneOrFail(Role, { id: roleId }),
        user: await this.em.findOneOrFail(User, { id: userId }),
      }),
    );
  }

  async removeRoleFromUser(orgId: string, userId: string, roleId: string) {
    const org = await this.findOneOrFail({ id: orgId });
    org.userRoleAssignments.remove({
      id: randomUUID(),
      org,
      role: await this.em.findOneOrFail(Role, { id: roleId }),
      user: await this.em.findOneOrFail(User, { id: userId }),
    });
  }
}
