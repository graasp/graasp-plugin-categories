// global
import { sql, DatabaseTransactionConnectionType as TrxHandler } from 'slonik';
// local
import { Category } from './interfaces/category';
import { CategoryType } from './interfaces/category-type';
import { ItemCategory } from './interfaces/item-category';

/**
 * Database's first layer of abstraction for Categorys
 */
export class CategoryService {

  private static allColumns = sql.join(
    [
      'id',
      ['item_id', 'itemId'],
      ['category_id', 'categoryId'],
    ].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  private static allColumnsItemId = sql.join(
    [
      ['item_id', 'itemId'],
    ].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  /**
   * Get all categories in given types
   */
  async getCategoriesByType(
    types: string[],
    dbHandler: TrxHandler,
  ): Promise<Category[]> {
    if (!types)
      return (
        dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM all_categories
      `,
        )
        .then(({ rows }) => rows.slice(0))
      );
    if (typeof types == 'string')
          types = [types];
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM all_categories
        WHERE type IN (${sql.join(types, sql`, `)})
      `,
        )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async getCategories(
    dbHandler: TrxHandler,
  ): Promise<Category[]> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM all_categories
      `,
        )
        .then(({ rows }) => rows.slice(0))
    );
  }

  /**
   * Get Category matching the given `id` or `null`, if not found.
   * @param id Category's id
   * @param dbHandler Database handler
   */
  async getCategory(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<Category> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM all_categories
        WHERE id = ${id}
        `,
          )
        .then(({ rows }) => rows[0] || null)
    );
  }

  // Get category types
  async getCategoryTypes(
    dbHandler: TrxHandler,
  ): Promise<CategoryType[]> {
    return (
      dbHandler
        .query<CategoryType>(
          sql`
        SELECT *
        FROM category_types
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  /**
   * Get itemCategory matching the given `itemid` or `null`, if not found.
   * @param id item's id
   * @param dbHandler Database handler
   */
  async getItemCategory(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<ItemCategory[]> {
    return (
      dbHandler
        .query<ItemCategory>(
          sql`
        SELECT ${CategoryService.allColumns}
        FROM item_category
        WHERE item_id = ${id}
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  // Get itemCategories matching given category(s)
  async getItemByCategory(
    ids: string[],
    dbHandler: TrxHandler,
  ): Promise<string[]> {
    if (typeof ids == 'string')
      return (
        dbHandler
          .query<string>(
            sql`
          SELECT ${CategoryService.allColumnsItemId}
          FROM item_category
          WHERE category_id = ${ids}
          `,
            )
          .then(({ rows }) => rows.slice(0))
      );
    return (
      dbHandler
        .query<string>(
          sql`
        WITH temp AS (
          SELECT item_id FROM item_category
          WHERE category_id = ${ids[0]}
        )
        SELECT ${CategoryService.allColumnsItemId} FROM item_category
        WHERE category_id = ${ids[1]} and item_id IN (SELECT item_id FROM temp)
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async createItemCategory(itemId: string, categoryId: string, transactionHandler: TrxHandler): Promise<ItemCategory> {
    return transactionHandler.query<ItemCategory>(sql`
        INSERT INTO item_category (item_id, category_id)
        VALUES (${itemId}, ${categoryId})
        ON CONFLICT DO NOTHING
        RETURNING ${CategoryService.allColumns}
      `)
      .then(({ rows }) => rows[0] || null);
  }

  async delete(id: string, transactionHandler: TrxHandler): Promise<Number> {
    return transactionHandler.query<Number>(sql`
        DELETE FROM item_category
        WHERE id = ${id}
        RETURNING *
      `)
      .then(({ rows }) => rows[0] || null);
  }

}
