import { AuthUser, InsertAuthUser, UpdateAuthUser } from "./auth_users.types";
import { ErrorLog, InsertErrorLog, UpdateErrorLog } from "./error_logs.types";
import {
  InsertUserProfile,
  UpdateUserProfile,
  UserProfile,
} from "./user_profiles.types";

export interface AuthUsersTable {
  row: AuthUser;
  update: UpdateAuthUser;
  insert: InsertAuthUser;
}

export interface UserProfilesTable {
  row: UserProfile;
  update: UpdateUserProfile;
  insert: InsertUserProfile;
}

export interface ErrorLogsTable {
  row: ErrorLog;
  update: UpdateErrorLog;
  insert: InsertErrorLog;
}

export interface Database {
  "auth.users": AuthUsersTable;
  user_profiles: UserProfilesTable;
  error_logs: ErrorLogsTable;
}

export default Database;
