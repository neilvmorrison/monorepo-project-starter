export interface Sessions {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  expires_at: Date;
  token_hash: string;
  auth_user_id: string;
  is_revoked: boolean | null;
}

export interface InsertSessions {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  expires_at: Date;
  token_hash: string;
  auth_user_id: string;
  is_revoked?: boolean | null;
}

export interface UpdateSessions {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  expires_at?: Date;
  token_hash?: string;
  auth_user_id?: string;
  is_revoked?: boolean | null;
}

export interface SessionsTable {
  row: Sessions;
  insert: InsertSessions;
  update: UpdateSessions;
}
