import { BaseRecord } from "./database";
import { USER_ROLE } from "./enums";

export interface UserProfile extends BaseRecord {
  auth_user_id: string;
  username: string;
  bio: string | null;
  requires_password: boolean;
  role: USER_ROLE;
}

export type InsertUserProfile = {
  auth_user_id: string;
  username: string;
  bio: string | null;
  base_prompt: string | null;
  requires_password: boolean;
};

export type UpdateUserProfile = Partial<InsertUserProfile>;
