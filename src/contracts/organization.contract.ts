import { SystemPermissionsSchema } from "#config/PERMISSIONS";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const organizationContract = c.router({
  createRole: {
    summary: "create role",
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/role",
    body: z.object({
      name: z.string(),
      permissions: SystemPermissionsSchema.array(),
    }),
    responses: {
      201: z.object({}),
    },
  },
  addUserToOrganization: {
    summary: "Add user to organization",
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/users",
    body: z.object({
      userId: z.string(),
    }),
    responses: {
      201: z.object({}),
    },
  },
  removeUserFromOrganization: {
    summary: "Remove User from organization",
    headers: z.object({ authorization: z.string() }),
    method: "DELETE",
    path: "/api/organization/:orgId/users",
    body: z.object({ userId: z.string() }),
    responses: {
      201: z.object({}),
    },
  },
  listRoles: {
    summary: "List roles owned by the organization",
    headers: z.object({ authorization: z.string() }),
    method: "GET",
    path: "/api/user/organization/:orgId/roles",
    responses: {
      200: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          isStandard: z.boolean(),
          permissions: z.array(
            z.object({ id: z.string(), slug: SystemPermissionsSchema }),
          ),
        }),
      ),
    },
  },
  assignRoleToUser: {
    summary: "Assign role to user",
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/users/:userId/roles",
    body: z.object({
      roleId: z.string(),
    }),
    responses: {
      201: z.object({}),
    },
  },
  removeRoleFromUser: {
    summary: "Remove role from user",
    headers: z.object({ authorization: z.string() }),
    method: "DELETE",
    path: "/api/organization/:orgId/users/:userId/roles",
    body: z.object({ roleId: z.string() }),
    responses: {
      201: z.object({}),
    },
  },
  listUsersInOrganization: {
    headers: z.object({ authorization: z.string() }),
    method: "GET",
    path: "/api/organization/:orgId/users",
    responses: {
      200: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          roles: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        }),
      ),
    },
  },
});
