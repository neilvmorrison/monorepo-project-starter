import { Pool } from "pg";
import DatabaseService from "../../db/db.service";

export class ErrorLogsService extends DatabaseService<"logs.error_logs"> {
  constructor(db: Pool) {
    super(db, "logs.error_logs");
  }
}
