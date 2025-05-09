import { BaseRecord } from "./base_record.types";

export interface Session extends BaseRecord {
  expires_at: Date;
  token_hash: string;
  auth_user_id: string;
  is_revoked: boolean;
}

export type InsertSession = {
  expires_at: Date;
  token_hash: string;
  auth_user_id: string;
  is_revoked: boolean;
};

export type UpdateSession = Partial<InsertSession>;
