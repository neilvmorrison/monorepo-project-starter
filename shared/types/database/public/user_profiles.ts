export interface UserProfiles {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  username: string;
  auth_user_id: string | null;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  avatar_url: string | null;
  birthdate: Date | null;
  email: string | null;
}

export interface InsertUserProfiles {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  username: string;
  auth_user_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  avatar_url?: string | null;
  birthdate?: Date | null;
  email?: string | null;
}

export interface UpdateUserProfiles {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  username?: string;
  auth_user_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  avatar_url?: string | null;
  birthdate?: Date | null;
  email?: string | null;
}

export interface UserProfilesTable {
  row: UserProfiles;
  insert: InsertUserProfiles;
  update: UpdateUserProfiles;
}
