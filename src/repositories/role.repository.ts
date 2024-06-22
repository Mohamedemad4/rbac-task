import { EntityRepository } from "@mikro-orm/postgresql";
import { Role } from "./models/role.model";

export class RoleRepository extends EntityRepository<Role> {
  // async createRole(orgId: string, name: string) {}
}
