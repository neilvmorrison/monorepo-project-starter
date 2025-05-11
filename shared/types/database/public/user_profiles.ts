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

export interface UserProfilesKey {
  id: string | undefined;
}

export interface CreateUserProfiles {
  id?: string | null;
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
  id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  username?: string | null;
  auth_user_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  avatar_url?: string | null;
  birthdate?: Date | null;
  email?: string | null;
}
