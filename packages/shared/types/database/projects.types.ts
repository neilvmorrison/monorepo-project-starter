import { BaseRecord } from "./database";

export interface Project extends BaseRecord {
  name: string;
  slug: string;
  base_prompt: string | null;
}
export type InsertProject = {
  name: string;
  slug: string;
  base_prompt: string | null;
};
export type UpdateProject = Partial<InsertProject>;
