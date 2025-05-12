export interface ErrorLogs {
  id: string | undefined;
  created_at: Date | null;
  updated_at: Date | null;
  message: string | null;
  status_code: number | null;
  request_metadata: Record<string, any> | null;
  response_metadata: Record<string, any> | null;
  method: string | null;
  url: string | null;
  auth_user_id: string | null;
}

export interface InsertErrorLogs {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  message?: string | null;
  status_code?: number | null;
  request_metadata?: Record<string, any> | null;
  response_metadata?: Record<string, any> | null;
  method?: string | null;
  url?: string | null;
  auth_user_id?: string | null;
}

export interface UpdateErrorLogs {
  id?: string | undefined;
  created_at?: Date | null;
  updated_at?: Date | null;
  message?: string | null;
  status_code?: number | null;
  request_metadata?: Record<string, any> | null;
  response_metadata?: Record<string, any> | null;
  method?: string | null;
  url?: string | null;
  auth_user_id?: string | null;
}

export interface ErrorLogsTable {
  row: ErrorLogs;
  insert: InsertErrorLogs;
  update: UpdateErrorLogs;
}
