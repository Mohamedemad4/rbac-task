import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  EntityRepositoryType,
  Collection,
} from "@mikro-orm/core";
import { Permission } from "./permissions.model";
import { RoleRepository } from "../role.repository";

@Entity({ repository: () => RoleRepository })
export class Role {
  [EntityRepositoryType]?: RoleRepository;
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  isRoot!: boolean;

  @Property()
  isStandard!: boolean;

  @ManyToMany(() => Permission)
  permissions: Collection<Permission> = new Collection<Permission>(this);
}
