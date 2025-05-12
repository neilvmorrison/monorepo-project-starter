import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: parseInt(process.env.DATABASE_PORT!),
  max: parseInt(process.env.DATABASE_MAX_CONNECTIONS!),
});

pool.on("error", (err, client) => {
  console.log(err, client);
});

export default pool;
