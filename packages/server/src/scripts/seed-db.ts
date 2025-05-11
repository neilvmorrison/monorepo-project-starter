#!/usr/bin/env ts-node

import pool from "../db/client";

/**
 * Database introspection script
 *
 * This script queries PostgreSQL system tables to show database structure
 */
async function introspectDatabase() {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    try {
      // List all schemas
      console.log("\n=== DATABASE SCHEMAS ===");
      const schemas = await client.query(`
        SELECT schema_name 
        FROM information_schema.schemata 
        WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
        ORDER BY schema_name;
      `);

      schemas.rows.forEach((row) => {
        console.log(`- ${row.schema_name}`);
      });

      // List all tables by schema
      console.log("\n=== TABLES BY SCHEMA ===");
      for (const schema of schemas.rows) {
        const schemaName = schema.schema_name;

        const tables = await client.query(
          `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = $1
          ORDER BY table_name;
        `,
          [schemaName]
        );

        if (tables.rows.length > 0) {
          console.log(`\nSchema: ${schemaName}`);

          for (const table of tables.rows) {
            const tableName = table.table_name;
            console.log(`\n  Table: ${tableName}`);

            // Get column information
            const columns = await client.query(
              `
              SELECT 
                column_name, 
                data_type, 
                is_nullable,
                column_default
              FROM information_schema.columns 
              WHERE table_schema = $1 
                AND table_name = $2
              ORDER BY ordinal_position;
            `,
              [schemaName, tableName]
            );

            console.log("  Columns:");
            columns.rows.forEach((col) => {
              const nullable = col.is_nullable === "YES" ? "NULL" : "NOT NULL";
              const defaultVal = col.column_default
                ? ` DEFAULT ${col.column_default}`
                : "";
              console.log(
                `    - ${col.column_name} (${col.data_type}) ${nullable}${defaultVal}`
              );
            });

            // Get primary key information
            const primaryKeys = await client.query(
              `
              SELECT kcu.column_name
              FROM information_schema.table_constraints tc
              JOIN information_schema.key_column_usage kcu
                ON tc.constraint_catalog = kcu.constraint_catalog
                AND tc.constraint_schema = kcu.constraint_schema
                AND tc.constraint_name = kcu.constraint_name
              WHERE tc.constraint_type = 'PRIMARY KEY'
                AND tc.table_schema = $1
                AND tc.table_name = $2;
            `,
              [schemaName, tableName]
            );

            if (primaryKeys.rows.length > 0) {
              console.log("  Primary Keys:");
              primaryKeys.rows.forEach((pk) => {
                console.log(`    - ${pk.column_name}`);
              });
            }

            // Get foreign key information
            const foreignKeys = await client.query(
              `
              SELECT
                kcu.column_name,
                ccu.table_schema AS foreign_table_schema,
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name
              FROM information_schema.table_constraints AS tc
              JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_schema = kcu.table_schema
              JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
                AND ccu.table_schema = tc.table_schema
              WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_schema = $1
                AND tc.table_name = $2;
            `,
              [schemaName, tableName]
            );

            if (foreignKeys.rows.length > 0) {
              console.log("  Foreign Keys:");
              foreignKeys.rows.forEach((fk) => {
                console.log(
                  `    - ${fk.column_name} → ${fk.foreign_table_schema}.${fk.foreign_table_name}.${fk.foreign_column_name}`
                );
              });
            }

            // Get index information
            const indices = await client.query(
              `
              SELECT
                i.relname AS index_name,
                a.attname AS column_name
              FROM
                pg_class t,
                pg_class i,
                pg_index ix,
                pg_attribute a,
                pg_namespace n
              WHERE
                t.oid = ix.indrelid
                AND i.oid = ix.indexrelid
                AND a.attrelid = t.oid
                AND a.attnum = ANY(ix.indkey)
                AND t.relkind = 'r'
                AND t.relname = $2
                AND n.nspname = $1
                AND t.relnamespace = n.oid
              ORDER BY
                i.relname, a.attname;
            `,
              [schemaName, tableName]
            );

            if (indices.rows.length > 0) {
              console.log("  Indices:");
              const indexMap = new Map();

              indices.rows.forEach((idx) => {
                if (!indexMap.has(idx.index_name)) {
                  indexMap.set(idx.index_name, []);
                }
                indexMap.get(idx.index_name).push(idx.column_name);
              });

              for (const [indexName, columns] of indexMap.entries()) {
                console.log(`    - ${indexName} (${columns.join(", ")})`);
              }
            }
          }
        }
      }
    } finally {
      // Release the client back to the pool
      client.release();
    }

    // Close the pool
    await pool.end();
  } catch (error) {
    console.error("Error introspecting database:", error);
    process.exit(1);
  }
}

// Run the introspection
introspectDatabase();
