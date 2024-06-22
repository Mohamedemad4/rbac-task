import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { UserRepository } from "../user.repository";

@Entity({ repository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;
}