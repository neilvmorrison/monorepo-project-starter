import { Pool, QueryResult, QueryResultRow } from "pg";
import { Database } from "shared/types";
import { tryCatch } from "shared/utils";
import { NotFoundError } from "../errors/NotFoundError";

export type DatabaseRow<T extends keyof Database> = Database[T] &
  QueryResultRow;

type WhereClause = {
  [key: string]: string | number;
};

export default abstract class DatabaseService<
  T extends keyof Database,
  U = Database[T]["row"]
> {
  db: Pool;
  tableName: T;

  constructor(db: Pool, tableName: T) {
    this.db = db;
    this.tableName = tableName;
  }

  protected async query<R extends DatabaseRow<T>["row"]>(
    query: string,
    values?: any[]
  ): Promise<QueryResult<R>> {
    const client = await this.db.connect();
    const { data, error } = await tryCatch(client.query<R>(query, values));
    client.release();
    if (error) throw error;
    return data;
  }

  async findMany(): Promise<U[]> {
    const records = await this.query<DatabaseRow<T>>(
      `select * from ${this.tableName}`
    );
    return records.rows as U[];
  }

  async findFirst(id: string | WhereClause): Promise<U | undefined> {
    if (typeof id === "string") {
      const records = await this.query<DatabaseRow<T>>(
        `select * from ${this.tableName} where id=$1`,
        [id]
      );
      return records.rows[0] as U | undefined;
    }

    const entries = Object.entries(id);
    const whereClause = entries
      .map((_, i) => `${entries[i][0]}=$${i + 1}`)
      .join(" AND ");
    const values = entries.map((entry) => entry[1]);

    const records = await this.query<DatabaseRow<T>>(
      `select * from ${this.tableName} where ${whereClause}`,
      values
    );
    return records.rows[0] as U | undefined;
  }

  async findFirstOrThrow(id: string | WhereClause): Promise<U> {
    const record = await this.findFirst(id);
    if (!record) {
      throw new NotFoundError(
        `Resource with id ${
          typeof id === "string" ? id : id.value
        } not found in ${this.tableName}`
      );
    }
    return record;
  }

  async create(payload: Database[T]["insert"]): Promise<U> {
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const columns = keys.join(", ");

    const records = await this.query<DatabaseRow<T>>(
      `insert into ${this.tableName} (${columns}) values (${placeholders}) returning *`,
      values
    );
    return records.rows[0] as U;
  }

  async update(id: string, payload: Database[T]["update"]): Promise<U> {
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const setClause = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");

    const records = await this.query<DatabaseRow<T>>(
      `update ${this.tableName} set ${setClause} where id=$${
        values.length + 1
      } returning *`,
      [...values, id]
    );
    return records.rows[0] as U;
  }

  async upsert(payload: Database[T]["insert"] & { id?: string }) {
    const { id, ...rest } = payload;
    const data = rest as Database[T]["insert"];

    if (!id) {
      return this.create(data);
    }

    const existing_record = await this.findFirst(id);
    if (!existing_record) {
      return this.create(data);
    }
    return this.update(id, data);
  }

  async _delete(id: string): Promise<void> {
    await this.query<DatabaseRow<T>>(
      `delete from ${this.tableName} where id=$1 returning *`,
      [id]
    );
  }
}
