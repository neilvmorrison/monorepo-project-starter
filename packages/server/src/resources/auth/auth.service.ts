import { Pool } from "pg";
import DatabaseService from "../../db/db.service";
import { tryCatch } from "shared/utils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { UserProfilesService } from "../user_profiles/user_profiles.service";
import {
  decodeToken,
  issueAccessToken,
  issueRefreshToken,
  verifyToken,
  getTokenExpiry,
} from "./jwt";
import { AuthUser, UserProfile } from "shared/types";
import { DatabaseError } from "../../errors/DatabaseError";
import { create_hash, hash_is_valid } from "./hash";
import { SessionsService } from "./sessions.service";

export class AuthService extends DatabaseService<"auth.users"> {
  userService: UserProfilesService;
  sessionsService: SessionsService;

  constructor(
    db: Pool,
    userService: UserProfilesService,
    sessionsService: SessionsService
  ) {
    super(db, "auth.users");
    this.userService = userService;
    this.sessionsService = sessionsService;
  }

  async loginUser(email: string, password: string) {
    const { data: authUser, error: authError } = await tryCatch<
      AuthUser,
      UnauthorizedError
    >(this.findFirstOrThrow({ email }));
    if (authError) throw authError;

    const isValidPassword = await hash_is_valid(
      password,
      authUser.password_hash
    );
    if (!isValidPassword) {
      throw new UnauthorizedError();
    }
    const { data: userProfile, error: userProfileError } = await tryCatch<
      UserProfile | undefined
    >(this.userService.findFirst({ auth_user_id: authUser.id }));

    if (userProfileError) {
      throw new DatabaseError(userProfileError.message);
    }
    if (!userProfile) {
      await this.userService.create({
        auth_user_id: authUser.id,
        username: email,
      });
    }
    await this.update(authUser.id, { last_login: new Date() });
    const tokenPayload = {
      email: authUser.email,
      userId: authUser.id,
    };
    const refreshToken = issueRefreshToken(tokenPayload);
    const accessToken = issueAccessToken(tokenPayload);
    const hashedRefreshToken = await create_hash(refreshToken);

    await this.sessionsService.create({
      auth_user_id: authUser.id,
      expires_at:
        getTokenExpiry(refreshToken) ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      token_hash: hashedRefreshToken,
      is_revoked: false,
    });

    return {
      refreshToken,
      accessToken,
      authUserId: authUser.id,
    };
  }

  async register(email: string, password: string, username: string) {
    const password_hash = await create_hash(password);
    const { data: newAuthUser, error } = await tryCatch(
      this.create({ email, password_hash })
    );
    if (error) {
      throw error;
    }
    const { error: profileError } = await tryCatch<UserProfile>(
      this.userService.create({
        username,
        auth_user_id: newAuthUser.id,
      })
    );
    if (profileError) {
      throw profileError;
    }
    return this.loginUser(newAuthUser.email, password);
  }

  async getCurrentUser(refresh_token: string) {
    const valid_token = verifyToken(refresh_token, "refresh");
    if (valid_token) {
      const decoded = decodeToken(refresh_token);
      if (decoded?.userId) {
        const user_profile = await this.userService.findFirst({
          auth_user_id: decoded?.userId,
        });
        return {
          is_authenticated: true,
          user_profile,
          error: null,
        };
      }
    }
    return {
      is_authenticated: false,
      user_profile: null,
      error: "Invalid token",
    };
  }
}
