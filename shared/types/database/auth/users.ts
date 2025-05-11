export interface Users {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  email: string;
  password_hash: string | null;
  last_login: Date | null;
}

export interface UsersKey {
  id: string | undefined;
}

export interface CreateUsers {
  id?: string | null;
  deleted_at?: Date | null;
  email: string;
  password_hash?: string | null;
  last_login?: Date | null;
}

export interface UpdateUsers {
  id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  email?: string | null;
  password_hash?: string | null;
  last_login?: Date | null;
}
