import { z } from "zod";

export enum SYSTEM_PERMISSIONS {
  VIEW_USERS = "VIEW_USERS",
  VIEW_ROLES = "VIEW_ROLES",
  MANAGE_ORG_USERS = "MANAGE_ORG_USERS",
  ASSIGN_ROLES = "ASSIGN_ROLES",
  EDIT_ROLES = "EDIT_ROLES",
  EDIT_ORG = "EDIT_ORG",
}

export const SystemPermissionsSchema = z.enum([
  "VIEW_USERS",
  "VIEW_ROLES",
  "MANAGE_ORG_USERS",
  "ASSIGN_ROLES",
  "EDIT_ROLES",
  "EDIT_ORG",
]);