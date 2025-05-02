import { Pool } from "pg";
import DatabaseService from "../../db/db.service";
import { tryCatch } from "shared/utils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { UserProfilesService } from "../user_profiles/user_profiles.service";
import { issueAccessToken, issueRefreshToken } from "./jwt";
import { AuthUser, UserProfile } from "shared/types";
import { DatabaseError } from "../../errors/DatabaseError";

export class AuthService extends DatabaseService<"auth.users"> {
  userService: UserProfilesService;

  constructor(db: Pool, userService: UserProfilesService) {
    super(db, "auth.users");
    this.userService = userService;
  }

  async loginUser(email: string, password: string) {
    const { data: authUser, error: authError } = await tryCatch<
      AuthUser,
      UnauthorizedError
    >(this.findFirstOrThrow({ field: "email", value: email }));
    if (authError) throw authError;
    if (authUser.password_hash !== password) {
      throw new UnauthorizedError();
    }
    const { data: userProfile, error: userProfileError } = await tryCatch<
      UserProfile | undefined
    >(
      this.userService.findFirst({ field: "auth_user_id", value: authUser.id })
    );
    if (userProfileError) {
      throw new DatabaseError(userProfileError.message);
    }
    if (!userProfile) {
      await this.userService.create({
        auth_user_id: authUser.id,
        username: email,
        bio: null,
        base_prompt: null,
        requires_password: false,
      });
    }
    this.update(authUser.id, { last_login: new Date() });
    const tokenPayload = {
      email: authUser.email,
      userId: authUser.id,
    };
    const refreshToken = issueRefreshToken(tokenPayload);
    const accessToken = issueAccessToken(tokenPayload);

    return {
      refreshToken,
      accessToken,
    };
  }
}
