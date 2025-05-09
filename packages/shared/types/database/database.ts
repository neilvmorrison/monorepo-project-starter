import { AuthUser, InsertAuthUser, UpdateAuthUser } from "./auth_users.types";
import { ErrorLog, InsertErrorLog, UpdateErrorLog } from "./error_logs.types";
import { Session, InsertSession, UpdateSession } from "./sessions.types";
import {
  InsertUserProfile,
  UpdateUserProfile,
  UserProfile,
} from "./user_profiles.types";
import {
  ActionLog,
  InsertActionLog,
  UpdateActionLog,
} from "./action_logs.types";

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

export interface ActionLogsTable {
  row: ActionLog;
  update: UpdateActionLog;
  insert: InsertActionLog;
}

export interface SessionsTable {
  row: Session;
  insert: InsertSession;
  update: UpdateSession;
}

export interface Database {
  "auth.users": AuthUsersTable;
  "auth.sessions": SessionsTable;
  "logs.error_logs": ErrorLogsTable;
  "logs.action_logs": ActionLogsTable;
  user_profiles: UserProfilesTable;
}

export default Database;
