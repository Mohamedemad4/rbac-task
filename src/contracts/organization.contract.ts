import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const organizationContract = c.router({
  updateOrganization: {
    headers: z.object({ authorization: z.string() }),
    method: "PATCH",
    path: "/api/organization/:orgId",
    body: z.object({
      name: z.string().optional(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  createRole: {
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/role",
    body: z.object({
      name: z.string(),
      permissions: z.array(z.string()),
    }),
    responses: {
      200: z.object({
        message: z.string(),
        role: z.object({
          id: z.string(),
          name: z.string(),
          permissions: z.array(z.string()),
        }),
      }),
    },
  },
  updateRole: {
    headers: z.object({ authorization: z.string() }),
    method: "PATCH",
    path: "/api/organization/:orgId/role/:roleId",
    body: z.object({
      name: z.string().optional(),
      permissions: z.array(z.string()).optional(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  addUserToOrganization: {
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/users",
    body: z.object({
      userId: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  removeUserFromOrganization: {
    headers: z.object({ authorization: z.string() }),
    method: "DELETE",
    path: "/api/organization/:orgId/users",
    body: z.object({ userId: z.string() }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  listRoles: {
    headers: z.object({ authorization: z.string() }),
    method: "GET",
    path: "/api/user/organization/:orgId/roles",
    responses: {
      200: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          permissions: z.array(z.string()),
        }),
      ),
    },
  },
  assignRoleToUser: {
    headers: z.object({ authorization: z.string() }),
    method: "POST",
    path: "/api/organization/:orgId/users/:userId/roles",
    body: z.object({
      roleId: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  removeRoleFromUser: {
    headers: z.object({ authorization: z.string() }),
    method: "DELETE",
    path: "/api/organization/:orgId/users/:userId/roles",
    body: z.object({ roleId: z.string() }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
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
          email: z.string(),
          roles: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
              }),
            )
            .optional(),
        }),
      ),
    },
  },
});
