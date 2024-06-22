import { User } from "./models/user.model";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UserRoleAssignment } from "./relations/user-role-assignment.relation";

export class UserRepository extends EntityRepository<User> {
  async findOrgs(userId: string) {
    const orgs = await this.findOneOrFail(
      { id: userId },
      { populate: ["organizations"] },
    );

    console.log(orgs.organizations.map((o) => o));
    return orgs.organizations;
  }

  async findPermissions(userId: string, orgId: string) {
    const permissionSlugs = (
      await this.em.findAll(UserRoleAssignment, {
        where: { org: { id: orgId }, user: { id: userId } },
        populate: ["role.permissions"],
      })
    )
      .map((assignment) => assignment.role.permissions)
      .map((p) => p.map((a) => a))
      .flat();

    return permissionSlugs;
  }
}
