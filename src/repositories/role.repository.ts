import { EntityRepository } from "@mikro-orm/postgresql";
import { Role } from "./models/role.model";
import { SYSTEM_PERMISSIONS } from "#config/PERMISSIONS";
import { randomUUID } from "crypto";
import { Organization } from "./models/organization.model";

export class RoleRepository extends EntityRepository<Role> {
  async createRole(
    orgId: string,
    name: string,
    permissions: SYSTEM_PERMISSIONS[],
  ) {
    const org = await this.em.findOneOrFail(Organization, { id: orgId });
    org.roles.add(
      this.create({
        isStandard: false,
        isRoot: false,
        name,
        permissions,
        id: randomUUID(),
      }),
    );
  }

  async deleteRole(orgId: string, roleId: string) {
    const role = await this.findOneOrFail({ id: roleId });
    this.em.remove(role);
  }
}
