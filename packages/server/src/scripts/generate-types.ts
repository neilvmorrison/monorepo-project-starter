#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";
import pool from "../db/client";

// Map PostgreSQL types to TypeScript types
const pgToTsTypeMap: Record<string, string> = {
  uuid: "string",
  text: "string",
  varchar: "string",
  char: "string",
  "character varying": "string",
  "timestamp with time zone": "Date",
  "timestamp without time zone": "Date",
  timestamp: "Date",
  date: "Date",
  time: "Date",
  boolean: "boolean",
  bool: "boolean",
  integer: "number",
  int: "number",
  smallint: "number",
  bigint: "number",
  decimal: "number",
  numeric: "number",
  real: "number",
  "double precision": "number",
  float: "number",
  jsonb: "Record<string, any>",
  json: "Record<string, any>",
  array: "any[]",
  bytea: "Buffer",
};

// Create the types directory if it doesn't exist
const TYPES_DIR = path.resolve(__dirname, "../../../../shared/types/database");

// Ensure the directory exists
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Convert snake_case to PascalCase for type names
function snakeToPascalCase(str: string): string {
  return str
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Get typescript type for a column
function getTypeScriptType(
  dataType: string,
  isNullable: string,
  columnDefault: string | null
): string {
  // Get the base type
  let tsType = pgToTsTypeMap[dataType] || "any";

  // Handle array types
  if (dataType.endsWith("[]")) {
    const baseType = dataType.slice(0, -2);
    tsType = `${pgToTsTypeMap[baseType] || "any"}[]`;
  }

  // Add nullable modifier if needed
  if (isNullable === "YES") {
    return `${tsType} | null`;
  }

  // For NOT NULL columns with default values like CURRENT_TIMESTAMP or gen_random_uuid()
  // we generally don't need to include them when inserting data
  if (
    columnDefault &&
    (columnDefault.includes("CURRENT_TIMESTAMP") ||
      columnDefault.includes("gen_random_uuid()"))
  ) {
    return `${tsType} | undefined`;
  }

  return tsType;
}

// Generate TypeScript interface for a table
function generateTableInterface(
  schemaName: string,
  tableName: string,
  columns: any[]
): string {
  const interfaceName = `${snakeToPascalCase(tableName)}`;
  let interfaceContent = `export interface ${interfaceName} {\n`;

  columns.forEach((column) => {
    const tsType = getTypeScriptType(
      column.data_type,
      column.is_nullable,
      column.column_default
    );
    interfaceContent += `  ${column.column_name}: ${tsType};\n`;
  });

  interfaceContent += `}\n`;
  return interfaceContent;
}

// Generate barrel file that exports all types
function generateIndexFile(schemas: Record<string, string[]>): string {
  let content = "// Auto-generated database type definitions\n\n";

  for (const [schema, tables] of Object.entries(schemas)) {
    for (const table of tables) {
      const pascalTable = snakeToPascalCase(table);
      content += `export * from "./${schema}/${table}";\n`;
    }
  }

  return content;
}

async function generateDatabaseTypes(): Promise<void> {
  try {
    // Get a client from the pool
    const client = await pool.connect();
    const schemaMap: Record<string, string[]> = {};

    try {
      console.log("Generating TypeScript types from database schema...");
      ensureDirectoryExists(TYPES_DIR);

      // List all schemas
      const schemas = await client.query(`
        SELECT schema_name 
        FROM information_schema.schemata 
        WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY schema_name;
      `);

      // Process each schema
      for (const schema of schemas.rows) {
        const schemaName = schema.schema_name;
        console.log(`Processing schema: ${schemaName}`);

        // Create a directory for this schema
        const schemaDir = path.join(TYPES_DIR, schemaName);
        ensureDirectoryExists(schemaDir);

        schemaMap[schemaName] = [];

        // Get tables in this schema
        const tables = await client.query(
          `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = $1
          ORDER BY table_name;
        `,
          [schemaName]
        );

        // Process each table
        for (const table of tables.rows) {
          const tableName = table.table_name;
          console.log(`  Processing table: ${tableName}`);

          schemaMap[schemaName].push(tableName);

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

          // Generate interface
          const typeContent = generateTableInterface(
            schemaName,
            tableName,
            columns.rows
          );

          // Write interface to file
          fs.writeFileSync(
            path.join(schemaDir, `${tableName}.ts`),
            typeContent,
            "utf8"
          );
        }
      }

      // Generate index.ts file that exports all types
      fs.writeFileSync(
        path.join(TYPES_DIR, "index.ts"),
        generateIndexFile(schemaMap),
        "utf8"
      );

      console.log(`\nTypes generated successfully in ${TYPES_DIR}`);
    } finally {
      // Release the client back to the pool
      client.release();
    }

    // Close the pool
    await pool.end();
  } catch (error) {
    console.error("Error generating database types:", error);
    process.exit(1);
  }
}

// Run the type generation
generateDatabaseTypes();
