// global
import { sql, DatabaseTransactionConnectionType as TrxHandler } from 'slonik';
// local
import { Category } from './interfaces/category';

/**
 * Database's first layer of abstraction for Categorys
 */
export class CategoryService {

  /**
   * Get all categories
   */
  async getAll(
    dbHandler: TrxHandler,
  ): Promise<Category[]> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM category_age
      `,
        )
        // TODO: is there a better way?
        .then(({ rows }) => rows.slice(0))
    );
  }

  /**
   * Get Category matching the given `id` or `null`, if not found.
   * @param id Category's id
   * @param dbHandler Database handler
   */
  async get(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<Category> {

    return dbHandler
      .query<Category>(
        sql`
        SELECT *
        FROM category_age
        WHERE id = ${id}
      `)
      .then(({ rows }) => rows[0] || null);
  }
}
