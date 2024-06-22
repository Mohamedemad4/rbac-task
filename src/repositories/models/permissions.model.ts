import { SYSTEM_PERMISSIONS } from "../../config/PERMISSIONS";
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { Role } from "./role.model";

@Entity()
export class Permission {
  @PrimaryKey()
  id!: string;

  @Property()
  @Unique()
  @Enum(() => SYSTEM_PERMISSIONS)
  slug!: string;

  @ManyToMany(() => Role)
  roles: Collection<Role> = new Collection<Role>(this);
}
