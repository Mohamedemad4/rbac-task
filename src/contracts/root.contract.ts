import { userContract } from "./user.contract";
import { organizationContract } from "./organization.contract";

export const rootContract = { ...organizationContract, ...userContract };
