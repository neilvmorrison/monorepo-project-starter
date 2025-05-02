import { BaseRecord } from "./database";

export interface AuthUser extends BaseRecord {
  email: string;
  password_hash: string;
  last_login: Date | null;
}

export type InsertAuthUser = {
  email: string;
  password_hash: string;
  last_login: Date | null;
};
export type UpdateAuthUser = Partial<InsertAuthUser>;
