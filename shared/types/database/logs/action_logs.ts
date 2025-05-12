export interface ActionLogs {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  action: string | null;
  auth_user_id: string | null;
  url: string | null;
  request_body: Record<string, any> | null;
  status: number | null;
}

export interface InsertActionLogs {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  action?: string | null;
  auth_user_id?: string | null;
  url?: string | null;
  request_body?: Record<string, any> | null;
  status?: number | null;
}

export interface UpdateActionLogs {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  action?: string | null;
  auth_user_id?: string | null;
  url?: string | null;
  request_body?: Record<string, any> | null;
  status?: number | null;
}

export interface ActionLogsTable {
  row: ActionLogs;
  insert: InsertActionLogs;
  update: UpdateActionLogs;
}
