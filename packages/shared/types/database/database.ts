import { AuthUser, InsertAuthUser, UpdateAuthUser } from "./auth_users.types";
import {
  InsertUserProfile,
  UpdateUserProfile,
  UserProfile,
} from "./user_profiles.types";

export interface BaseRecord {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface AuthUsersTable {
  row: AuthUser;
  update: UpdateAuthUser;
  insert: InsertAuthUser;
}

export interface UserProfilesTable extends BaseRecord {
  row: UserProfile;
  update: UpdateUserProfile;
  insert: InsertUserProfile;
}

export interface Database {
  "auth.users": AuthUsersTable;
  user_profiles: UserProfilesTable;
}

export default Database;
