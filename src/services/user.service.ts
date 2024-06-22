import env from "#config/env";
import { DI } from "../app";
import { hash, compare } from "bcrypt";
import { sign, verify, decode } from "jsonwebtoken";

import { AlreadyExistsError } from "#errors/AlreadyExists";
import { UnauthenticatedError } from "#errors/UnauthenticatedError";
import { randomUUID } from "crypto";

export class UserService {
  constructor() {}

  async register(name: string, email: string, password: string) {
    if (await DI.userRepository.findOne({ email })) {
      throw new AlreadyExistsError();
    }
    const user = DI.userRepository.create({
      id: randomUUID(),
      name,
      email,
      password: await hash(password, 10),
    });

    const org = DI.organizationRepository.create({
      id: randomUUID(),
      name,
    });

    await DI.organizationRepository.assignUserToOrg(org.id, user.id);
    const rootRole = await DI.roleRepository.findOneOrFail({ isRoot: true });

    await DI.organizationRepository.assignRoleToUser(
      org.id,
      user.id,
      rootRole.id,
    );

    await DI.orm.em.flush();
  }

  async login(email: string, password: string) {
    try {
      const user = await DI.userRepository.findOneOrFail({
        email,
      });

      if (await compare(password, user.password)) {
        const payload = {
          userId: user.id,
          name: user.name,
          email: user.email,
        } as UserClaims;
        return {
          access_token: sign(payload, env.PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: env.ACCESS_TOKEN_EXPIRY,
          }),
          refresh_token: sign(payload, env.PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: env.REFRESH_TOKEN_EXPIRY,
          }),
        };
      } else {
        throw new UnauthenticatedError();
      }
    } catch (e) {
      console.log(e);
      throw new UnauthenticatedError();
    }
  }

  async refresh(refreshToken: string) {
    if (
      verify(refreshToken, env.PRIVATE_KEY, {
        algorithms: ["RS256"],
      })
    ) {
      const decoded = decode(refreshToken) as UserClaims;
      const user = await DI.userRepository.findOneOrFail({
        id: decoded.userId,
      });

      const payload = {
        userId: user.id,
        name: user.name,
        email: user.email,
      } as UserClaims;

      return {
        access_token: sign(payload, env.PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: env.ACCESS_TOKEN_EXPIRY,
        }),
      };
    } else {
      throw new UnauthenticatedError();
    }
  }
  async listOrganizations(userId: string) {
    return (await DI.userRepository.findOrgs(userId)).map((o) => ({
      id: o.id,
      name: o.name,
    }));
  }
}
