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

export interface ActionLogsKey {
  id: string | undefined;
}

export interface CreateActionLogs {
  id?: string | null;
  action?: string | null;
  auth_user_id?: string | null;
  url?: string | null;
  request_body?: Record<string, any> | null;
  status?: number | null;
}

export interface UpdateActionLogs {
  id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  action?: string | null;
  auth_user_id?: string | null;
  url?: string | null;
  request_body?: Record<string, any> | null;
  status?: number | null;
}
