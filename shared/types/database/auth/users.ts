export interface Users {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  email: string;
  password_hash: string | null;
  last_login: Date | null;
}

export interface InsertUsers {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  email: string;
  password_hash?: string | null;
  last_login?: Date | null;
}

export interface UpdateUsers {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  email?: string;
  password_hash?: string | null;
  last_login?: Date | null;
}

export interface UsersTable {
  row: Users;
  insert: InsertUsers;
  update: UpdateUsers;
}
