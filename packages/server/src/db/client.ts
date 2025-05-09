import { Pool } from "pg";

const pool = new Pool({
  database: "monorepo-starter",
  host: "localhost",
  user: "neilmorrison",
  port: 5432,
  max: 10,
});

pool.on("error", (err, client) => {
  console.log(err, client);
});

export default pool;
