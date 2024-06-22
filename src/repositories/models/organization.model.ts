import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { OrganizationRepository } from "../organization.repoistory";
import { Role } from "./role.model";
import { UserRoleAssignment } from "#repositories/relations/user-role-assignment.relation";
import { UserOrgAssignment } from "#repositories/relations/user-org-assignment.relation";

@Entity({ repository: () => OrganizationRepository })
export class Organization {
  [EntityRepositoryType]?: OrganizationRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  // strictly for roles created and managed by this organization
  @ManyToMany({ owner: true })
  roles: Collection<Role> = new Collection<Role>(this);

  @OneToMany(() => UserRoleAssignment, "org", {
    orphanRemoval: true,
    nullable: true,
  })
  userRoleAssignments = new Collection<UserRoleAssignment>(this);

  @OneToMany(() => UserOrgAssignment, "org", {
    orphanRemoval: true,
    nullable: true,
  })
  userOrgAssignment = new Collection<UserOrgAssignment>(this);
}
