import { BaseRecord } from "./database";
import { MESSAGE_ROLE } from "./enums";

export interface ConversationMessage extends BaseRecord {
  role: MESSAGE_ROLE;
  content: string;
  conversation_id: string;
  user_profile_id: string;
}

export type InsertConversationMessage = {
  role: MESSAGE_ROLE;
  content: string;
  conversation_id: string;
  user_profile_id: string;
};

export type UpdateConversationMessage = Partial<InsertConversationMessage>;
