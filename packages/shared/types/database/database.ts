import { AuthUser, InsertAuthUser, UpdateAuthUser } from "./auth_users.types";
import {
  InsertUserProfile,
  UpdateUserProfile,
  UserProfile,
} from "./user_profiles.types";
import {
  Conversation,
  InsertConversation,
  UpdateConversation,
} from "./conversations.types";
import {
  ConversationMessage,
  InsertConversationMessage,
  UpdateConversationMessage,
} from "./conversation_messages.types";
import { InsertProject, Project, UpdateProject } from "./projects.types";
import {
  InsertUserProject,
  UpdateUserProject,
  UserProject,
} from "./user_projects.types";

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

export interface ConversationsTable extends BaseRecord {
  row: Conversation;
  update: UpdateConversation;
  insert: InsertConversation;
}

export interface ConversationMessagesTable extends BaseRecord {
  row: ConversationMessage;
  update: UpdateConversationMessage;
  insert: InsertConversationMessage;
}

export interface ProjectsTable extends BaseRecord {
  row: Project;
  update: UpdateProject;
  insert: InsertProject;
}

export interface UserProjectsTable {
  row: UserProject;
  update: UpdateUserProject;
  insert: InsertUserProject;
}

export interface Database {
  "auth.users": AuthUsersTable;
  user_profiles: UserProfilesTable;
  user_projects: UserProjectsTable;
  projects: ProjectsTable;
  conversations: ConversationsTable;
  conversation_messages: ConversationMessagesTable;
}

export default Database;
