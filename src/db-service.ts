// global
import { sql, DatabaseTransactionConnectionType as TrxHandler } from 'slonik';
// local
import { Category } from './interfaces/category';
import { ItemCategory } from './interfaces/item-category';

/**
 * Database's first layer of abstraction for Categorys
 */
export class CategoryService {

  /**
   * Get all age categories
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
   * Get all displine categories
   */
   async getAllDisplines(
    dbHandler: TrxHandler,
  ): Promise<Category[]> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM category_discipline
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
    table_name: string,
    dbHandler: TrxHandler,
  ): Promise<Category> {

    return dbHandler
      .query<Category>(
        sql`
        SELECT *
        FROM ${table_name}
        WHERE id = ${id}
      `)
      .then(({ rows }) => rows[0] || null);
  }

  async create(itemCategory: Partial<ItemCategory>, transactionHandler: TrxHandler): Promise<ItemCategory> {
    const { itemId, categoryAge } = itemCategory;
    return transactionHandler.query<ItemCategory>(sql`
        INSERT INTO item_category (item_id, category_age)
        VALUES (${itemId}, ${categoryAge})
        ON CONFLICT (item_id)
        DO
        UPDATE SET category_age = ${categoryAge}
        RETURNING item_id, category_age, category_discipline
      `)
      .then(({ rows }) => rows[0]);
  }

}
