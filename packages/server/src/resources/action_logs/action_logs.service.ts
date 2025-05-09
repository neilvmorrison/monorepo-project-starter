import { Pool } from "pg";
import DatabaseService from "../../db/db.service";

export class ActionLogsService extends DatabaseService<"logs.action_logs"> {
  constructor(db: Pool) {
    super(db, "logs.action_logs");
  }
}
