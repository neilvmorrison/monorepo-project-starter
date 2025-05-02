import { BaseRecord } from "./database";

export interface UserProject extends BaseRecord {
  user_profile_id: string;
  project_id: string;
  is_favorite: string;
}
export type InsertUserProject = {
  user_profile_id: string;
  project_id: string;
  is_favorite: boolean;
};
export type UpdateUserProject = Partial<InsertUserProject>;
