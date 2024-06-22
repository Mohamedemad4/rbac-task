import { DI } from "../app";
import { BadRequestError } from "#errors/BadRequestError";
import { SYSTEM_PERMISSIONS } from "#config/PERMISSIONS";

export class OrganizationService {
  constructor() {}
  async addUserToOrganization(orgId: string, userId: string) {
    await DI.organizationRepository.assignUserToOrg(orgId, userId);
    await DI.orm.em.flush();
  }

  async removeUserFromOrganization(orgId: string, userId: string) {
    if (
      (await DI.organizationRepository.findUserRoles(userId, orgId)).find(
        (roles) => roles.isRoot,
      )
    ) {
      throw new BadRequestError("Can't delete root user from organization");
    }
    await DI.organizationRepository.removeUserFromOrg(orgId, userId);
    await DI.orm.em.flush();
  }

  async listRoles(orgId: string) {
    return (await DI.organizationRepository.findOrg(orgId)).roles.map((r) => ({
      id: r.id,
      isStandard: r.isStandard,
      isRoot: r.isRoot,
      name: r.name,
      permissions: r.permissions.map((p) => ({
        slug: p.slug as SYSTEM_PERMISSIONS,
        id: p.id,
      })),
    }));
  }

  async createRole(
    orgId: string,
    name: string,
    permissions: SYSTEM_PERMISSIONS[],
  ) {
    DI.roleRepository.createRole(orgId, name, permissions);
    DI.orm.em.flush();
  }

  async listUsers(orgId: string) {
    const transformInput = (
      input: {
        role: { id: string; name: string };
        user: { id: string; name: string };
      }[],
    ) => {
      const userMap = new Map();

      input.forEach(({ role, user }) => {
        if (!userMap.has(user.id)) {
          userMap.set(user.id, { ...user, roles: [] });
        }
        userMap.get(user.id).roles.push(role);
      });

      return Array.from(userMap.values());
    };

    return transformInput(
      (await DI.organizationRepository.findUsersWithRoles(orgId)).map((p) => ({
        role: p.role,
        user: p.user,
      })),
    );
  }

  async assignRoleToUser(orgId: string, userId: string, roleId: string) {
    await DI.organizationRepository.assignRoleToUser(orgId, userId, roleId);
    await DI.orm.em.flush();
  }
}
