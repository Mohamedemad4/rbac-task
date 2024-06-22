import { Entity, PrimaryKey, ManyToOne, Unique } from "@mikro-orm/core";
import { User } from "../models/user.model";
import { Organization } from "../models/organization.model";

@Entity()
@Unique({ properties: ["org", "user"] })
export class OrganizationUser {
  @PrimaryKey()
  id!: string;

  @ManyToOne()
  org!: Organization;

  @ManyToOne()
  user!: User;
}
