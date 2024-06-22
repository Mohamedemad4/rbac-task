import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import { Organization } from "../models/organization.model";
import { Entity, PrimaryKey, ManyToOne, Unique } from "@mikro-orm/core";

@Entity()
@Unique({ properties: ["org", "user", "role"] })
// TODO type this with QueryBuilder.
// @Check({
//   expression: `
//   (SELECT COUNT(*)
//    FROM organization_user_role our
//    JOIN role r ON our.role_id = r.id
//    WHERE our.org_id = organization_user_role.org_id
//    AND r.is_root = true) <= 1
// `,
// })
export class OrganizationUserRole {
  @PrimaryKey()
  id!: string;

  @ManyToOne()
  org!: Organization;

  @ManyToOne()
  user!: User;

  @ManyToOne()
  role!: Role;
}
