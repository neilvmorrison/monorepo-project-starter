import { Pool } from "pg";
import DatabaseService from "../../db/db.service";
import { tryCatch } from "shared/utils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { hash_is_valid } from "./hash";

export class SessionsService extends DatabaseService<"auth.sessions"> {
  constructor(db: Pool) {
    super(db, "auth.sessions");
  }

  async invalidateCurrentSession(id: string) {
    this.update(id, { is_revoked: true });
  }

  async currentSessionIsValid(auth_user_id: string, refresh_token: string) {
    const { data: session, error: session_error } = await tryCatch(
      this.findFirstOrThrow({ auth_user_id })
    );

    if (!session) {
      throw new UnauthorizedError();
    }

    const { data: tokenIsValid, error: tokenError } = await tryCatch(
      hash_is_valid(refresh_token, session.token_hash)
    );

    if (tokenError || !tokenIsValid) {
      return false;
    }
    this.invalidateCurrentSession(session.id);
    return true;
  }
}
