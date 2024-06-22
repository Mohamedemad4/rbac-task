import { EntityManager } from "@mikro-orm/postgresql";
import { Permission } from "#repositories/models/permissions.model";
import { Role } from "#repositories/models/role.model";
import { SYSTEM_PERMISSIONS } from "../PERMISSIONS";
import { randomUUID } from "crypto";

export const seed = async (em: EntityManager) => {
  const c = em.fork();
  const roleRepository = c.getRepository(Role);
  if (!(await roleRepository.findOne({ isRoot: true }))) {
    const perms = Object.values(SYSTEM_PERMISSIONS).map((v) =>
      c.create(Permission, { id: randomUUID(), slug: v }),
    );
    console.log(perms.length);
    console.log(perms);
    console.log("CREATED");

    roleRepository.create({
      id: randomUUID(),
      isRoot: true,
      isStandard: true,
      name: "root",
      permissions: perms,
    });
  }

  await c.flush();
};
