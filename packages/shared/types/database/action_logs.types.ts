import { BaseRecord } from "./base_record.types";
import { ACTION_LOGS } from "./enums";

export interface ActionLog extends BaseRecord {
  action: ACTION_LOGS;
  url: string;
  auth_user_id: string;
  request_body: Record<string, any>;
  status: number;
}

export type InsertActionLog = {
  action: ACTION_LOGS;
  url: string;
  auth_user_id: string;
  request_body: Record<string, any>;
  status: number;
};

export type UpdateActionLog = Partial<InsertActionLog>;
