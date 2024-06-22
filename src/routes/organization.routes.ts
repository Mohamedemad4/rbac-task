import { initServer } from "@ts-rest/express";
import { catchAppErrorsHTTP } from "#utils/catchAppErrorsHttp";
import { authenticate } from "#middlewares/authenticate.middleware";
import { organizationContract } from "#contracts/organization.contract";
import { canActivate } from "#middlewares/canActivate.guard";
import { SYSTEM_PERMISSIONS } from "#config/PERMISSIONS";
import { OrganizationService } from "#services/organization.service";
const s = initServer();

const organizationService = new OrganizationService();

export const organizationRouter = s.router(organizationContract, {
  addUserToOrganization: {
    middleware: [
      authenticate,
      canActivate(SYSTEM_PERMISSIONS.MANAGE_ORG_USERS),
    ],
    handler: async ({ params: { orgId }, body: { userId } }) =>
      catchAppErrorsHTTP(
        organizationService.addUserToOrganization(orgId, userId),
      ),
  },
  removeUserFromOrganization: {
    middleware: [
      authenticate,
      canActivate(SYSTEM_PERMISSIONS.MANAGE_ORG_USERS),
    ],
    handler: async ({ params: { orgId }, body: { userId } }) =>
      catchAppErrorsHTTP(
        organizationService.removeUserFromOrganization(orgId, userId),
      ),
  },
  listRoles: {
    middleware: [authenticate, canActivate(SYSTEM_PERMISSIONS.VIEW_ROLES)],
    handler: async ({ params: { orgId } }) =>
      catchAppErrorsHTTP(organizationService.listRoles(orgId)),
  },

  createRole: {
    middleware: [authenticate, canActivate(SYSTEM_PERMISSIONS.EDIT_ROLES)],
    handler: async ({ params: { orgId }, body: { name, permissions } }) =>
      catchAppErrorsHTTP(
        organizationService.createRole(
          orgId,
          name,
          permissions as SYSTEM_PERMISSIONS[],
        ),
      ),
  },

  assignRoleToUser: {
    middleware: [authenticate, canActivate(SYSTEM_PERMISSIONS.ASSIGN_ROLES)],
    handler: async ({ params: { orgId, userId }, body: { roleId } }) =>
      catchAppErrorsHTTP(
        organizationService.assignRoleToUser(orgId, userId, roleId),
      ),
  },
  listUsersInOrganization: {
    middleware: [authenticate, canActivate(SYSTEM_PERMISSIONS.VIEW_USERS)],
    handler: async ({ params: { orgId } }) =>
      catchAppErrorsHTTP(organizationService.listUsers(orgId)),
  },
  removeRoleFromUser: {
    middleware: [authenticate, canActivate(SYSTEM_PERMISSIONS.ASSIGN_ROLES)],
    handler: async ({ params: { orgId, userId } }) =>
      catchAppErrorsHTTP(
        organizationService.removeUserFromOrganization(orgId, userId),
      ),
  },
});
