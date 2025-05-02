import { BaseRecord } from "./database";

export interface UserProfile extends BaseRecord {
  auth_user_id: string;
  username: string;
  bio: string | null;
  requires_password: boolean;
}

export type InsertUserProfile = {
  auth_user_id: string;
  username: string;
  bio: string | null;
  base_prompt: string | null;
  requires_password: boolean;
};

export type UpdateUserProfile = Partial<InsertUserProfile>;
