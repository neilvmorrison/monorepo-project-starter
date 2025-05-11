import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  database: process.env.DATABASE_NAME || "taskmaster",
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "neilmorrison",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  max: parseInt(process.env.DATABASE_MAX_CONNECTIONS || "10"),
});

pool.on("error", (err, client) => {
  console.log(err, client);
});

export default pool;
