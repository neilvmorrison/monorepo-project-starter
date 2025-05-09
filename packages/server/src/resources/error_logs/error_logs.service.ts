import { Pool } from "pg";
import DatabaseService from "../../db/db.service";

export class ErrorLogsService extends DatabaseService<"error_logs"> {
  constructor(db: Pool) {
    super(db, "error_logs");
  }
}
