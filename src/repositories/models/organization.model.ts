import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { OrganizationRepository } from "../organization.repoistory";

@Entity({ repository: () => OrganizationRepository })
export class Organization {
  [EntityRepositoryType]?: OrganizationRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;
}
