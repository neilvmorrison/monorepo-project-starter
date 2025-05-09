import { BaseRecord } from "./base_record.types";

export interface ErrorLog extends BaseRecord {
  message: string;
  status_code: number;
  request_metadata: Record<string, any>;
  response_metadata: Record<string, any>;
  method: string;
  url: string;
  auth_user_id?: string;
}

export type InsertErrorLog = {
  message: string;
  status_code: number;
  request_metadata: Record<string, any>;
  response_metadata: Record<string, any>;
  method: string;
  url: string;
  auth_user_id?: string;
};
export type UpdateErrorLog = Partial<InsertErrorLog>;
