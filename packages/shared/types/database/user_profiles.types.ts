import { BaseRecord } from "./base_record.types";

export interface UserProfile extends BaseRecord {
  auth_user_id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
}

export type InsertUserProfile = {
  auth_user_id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
};

export type UpdateUserProfile = Partial<InsertUserProfile>;
