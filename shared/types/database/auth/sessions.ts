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

export interface SessionsKey {
  id: string | undefined;
}

export interface CreateSessions {
  id?: string | null;
  deleted_at?: Date | null;
  expires_at: Date;
  token_hash: string;
  auth_user_id: string;
  is_revoked?: boolean | null;
}

export interface UpdateSessions {
  id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  expires_at?: Date | null;
  token_hash?: string | null;
  auth_user_id?: string | null;
  is_revoked?: boolean | null;
}
