// packages/server/src/db/setup-db-fixed.js
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log("Starting database setup...");

    // Start a transaction
    await client.query("BEGIN");

    // Create schemas if they don't exist
    await client.query("CREATE SCHEMA IF NOT EXISTS auth;");
    await client.query("CREATE SCHEMA IF NOT EXISTS logs;");

    // Option 1: Drop existing tables (uncomment if you want to start fresh)
    // await client.query("DROP TABLE IF EXISTS logs.error_logs CASCADE;");
    // await client.query("DROP TABLE IF EXISTS logs.action_logs CASCADE;");
    // await client.query("DROP TABLE IF EXISTS user_profiles CASCADE;");
    // await client.query("DROP TABLE IF EXISTS auth.sessions CASCADE;");
    // await client.query("DROP TABLE IF EXISTS auth.users CASCADE;");

    // Get all SQL files in the seed_scripts directory
    const seedScriptsDir = path.join(__dirname, "seed_scripts");
    const sqlFiles = fs
      .readdirSync(seedScriptsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort(); // Sort to ensure proper execution order by filename prefix

    // Execute each SQL file in order
    for (const file of sqlFiles) {
      console.log(`Executing ${file}...`);
      const filePath = path.join(seedScriptsDir, file);
      let sql = fs.readFileSync(filePath, "utf8");

      // Option 2: Modify SQL to use IF NOT EXISTS (safer approach)
      sql = sql
        // For tables
        .replace(/CREATE TABLE ([^\(]+)/g, "CREATE TABLE IF NOT EXISTS $1")
        // For indices
        .replace(
          /CREATE (UNIQUE )?INDEX ([^\(]+)/g,
          "CREATE $1INDEX IF NOT EXISTS $2"
        )
        // For schemas
        .replace(/CREATE SCHEMA ([^\;]+)/g, "CREATE SCHEMA IF NOT EXISTS $1");

      try {
        // Execute the modified SQL statements
        await client.query(sql);
        console.log(`✓ ${file} executed successfully`);
      } catch (err) {
        console.warn(`⚠️ Warning while executing ${file}: ${err.message}`);
        // We continue despite errors - this is a design choice that can be changed
      }
    }

    // Commit the transaction
    await client.query("COMMIT");
    console.log("Database setup completed successfully!");
  } catch (error) {
    // Rollback in case of error
    await client.query("ROLLBACK");
    console.error("Error setting up database:", error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the setup function
setupDatabase()
  .then(() => {
    console.log("Database initialization completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });
