// Auto-generated database type definitions

import { Sessions, InsertSessions, UpdateSessions, SessionsTable } from "./auth/sessions";
import { Users, InsertUsers, UpdateUsers, UsersTable } from "./auth/users";
import { ActionLogs, InsertActionLogs, UpdateActionLogs, ActionLogsTable } from "./logs/action_logs";
import { ErrorLogs, InsertErrorLogs, UpdateErrorLogs, ErrorLogsTable } from "./logs/error_logs";
import { UserProfiles, InsertUserProfiles, UpdateUserProfiles, UserProfilesTable } from "./public/user_profiles";

// Re-export all types
export { Sessions, InsertSessions, UpdateSessions, SessionsTable };
export { Users, InsertUsers, UpdateUsers, UsersTable };
export { ActionLogs, InsertActionLogs, UpdateActionLogs, ActionLogsTable };
export { ErrorLogs, InsertErrorLogs, UpdateErrorLogs, ErrorLogsTable };
export { UserProfiles, InsertUserProfiles, UpdateUserProfiles, UserProfilesTable };

// Database interface mapping all tables
export interface Database {
  "auth.sessions": SessionsTable;
  sessions: SessionsTable;
  "auth.users": UsersTable;
  users: UsersTable;
  "logs.action_logs": ActionLogsTable;
  action_logs: ActionLogsTable;
  "logs.error_logs": ErrorLogsTable;
  error_logs: ErrorLogsTable;
  user_profiles: UserProfilesTable;
}
