import { BaseRecord } from "./database";

export interface Conversation extends BaseRecord {
  user_profile_id: string;
  title?: string | null;
}

export type InsertConversation = {
  user_profile_id: string;
  title: string;
};
export type UpdateConversation = Partial<InsertConversation>;
