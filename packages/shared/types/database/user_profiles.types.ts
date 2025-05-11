import { BaseRecord } from "./base_record.types";

export interface UserProfile extends BaseRecord {
  auth_user_id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  email: string | null;
}

export interface UserProject extends BaseRecord {
  name: string;
  description: string | null;
  user_id: string;
}

export type InsertUserProfile = {
  auth_user_id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  email?: string | null;
};

export type UpdateUserProfile = Partial<InsertUserProfile>;
