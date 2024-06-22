import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import { Organization } from "../models/organization.model";
import { Entity, PrimaryKey, ManyToOne, Unique } from "@mikro-orm/core";

@Entity()
@Unique({ properties: ["org", "user", "role"] })
export class UserRoleAssignment {
  @PrimaryKey()
  id!: string;

  @ManyToOne()
  org!: Organization;

  @ManyToOne()
  user!: User;

  @ManyToOne()
  role!: Role;
}
