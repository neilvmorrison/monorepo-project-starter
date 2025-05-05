import { Pool } from "pg";
import DatabaseService from "../../db/db.service";

export class UserProfilesService extends DatabaseService<"user_profiles"> {
  constructor(db: Pool) {
    super(db, "user_profiles");
  }
}
