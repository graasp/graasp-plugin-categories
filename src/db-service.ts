// global
import { Item } from 'graasp';
import { sql, DatabaseTransactionConnection as TrxHandler } from 'slonik';
// local
import { Category } from './interfaces/category';
import { CategoryType } from './interfaces/category-type';
import { ItemCategory } from './interfaces/item-category';
import { groupBy } from './utils';

/**
 * Database's first layer of abstraction for Categorys
 */
export class CategoryService {
  private static allColumns = sql.join(
    ['id', ['item_id', 'itemId'], ['category_id', 'categoryId']].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  private static allColumnsItemForJoins = sql.join(
    [
      [['item', 'id'], ['id']],
      [['item', 'name'], ['name']],
      [['item', 'description'], ['description']],
      [['item', 'type'], ['type']],
      [['item', 'path'], ['path']],
      [['item', 'extra'], ['extra']],
      [['item', 'settings'], ['settings']],
      [['item', 'creator'], ['creator']],
      [['item', 'created_at'], ['createdAt']],
      [['item', 'updated_at'], ['updatedAt']],
    ].map((c) =>
      sql.join(
        c.map((cwa) => sql.identifier(cwa)),
        sql` AS `,
      ),
    ),
    sql`, `,
  );

  private static allItemColumns = sql.join(
    [
      'id',
      'name',
      'description',
      'type',
      'path',
      'extra',
      'settings',
      'creator',
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
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
      return dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM category
      `,
        )
        .then(({ rows }) => rows.slice(0));
    if (typeof types == 'string') types = [types];
    return dbHandler
      .query<Category>(
        sql`
        SELECT *
        FROM category
        WHERE type IN (${sql.join(types, sql`, `)})
      `,
      )
      .then(({ rows }) => rows.slice(0));
  }

  async getCategories(dbHandler: TrxHandler): Promise<Category[]> {
    return dbHandler
      .query<Category>(
        sql`
        SELECT *
        FROM category
      `,
      )
      .then(({ rows }) => rows.slice(0));
  }

  /**
   * Get Category matching the given `id` or `null`, if not found.
   * @param id Category's id
   * @param dbHandler Database handler
   */
  async getCategory(id: string, dbHandler: TrxHandler): Promise<Category> {
    return dbHandler
      .query<Category>(
        sql`
        SELECT *
        FROM category
        WHERE id = ${id}
        `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  // Get category types
  async getCategoryTypes(dbHandler: TrxHandler): Promise<CategoryType[]> {
    return dbHandler
      .query<CategoryType>(
        sql`
        SELECT *
        FROM category_type
        `,
      )
      .then(({ rows }) => rows.slice(0));
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
    return dbHandler
      .query<ItemCategory>(
        sql`
        SELECT ${CategoryService.allColumns}
        FROM item_category
        WHERE item_id = ${id}
        `,
      )
      .then(({ rows }) => rows.slice(0));
  }

  // Get itemCategories matching given category(s) (intersection)
  async getItemsByCategories(
    ids: string[][],
    dbHandler: TrxHandler,
  ): Promise<Item[]> {
    return
      dbHandler
        .query<Item & { total: number }>(
        //   sql`
        // SELECT ${CategoryService.allColumnsItemForJoins} 
        // FROM item_category
        // LEFT JOIN item ON item.id = item_category.item_id  
        // WHERE category_id IN (${sql.join(ids[0], sql`, `)}) 
        // `,
          sql`
        WITH selectedItemIds AS (
        SELECT levelItem.item_id AS id
        FROM (
        SELECT item_id
        FROM item_category
        WHERE category_id IN (${sql.join(ids[0], sql`, `)})
        GROUP BY item_id
        ) AS levelItem
        INNER JOIN (
        SELECT item_id
        FROM item_category
        WHERE category_id IN ('${sql.join(ids[1], sql`, `)})
        GROUP BY item_id
        ) AS disciplineItem
        ON levelItem.item_id = disciplineItem.item_id
        ) SELECT ${CategoryService.allItemColumns}
        FROM item
        WHERE id in (SELECT id FROM selectedItemIds)
        `,
        )
        // group by item id, return only entries with equal number of category ids
        .then(({ rows }) => rows.slice(0));
  }

  async createItemCategory(
    itemId: string,
    categoryId: string,
    transactionHandler: TrxHandler,
  ): Promise<ItemCategory> {
    return transactionHandler
      .query<ItemCategory>(
        sql`
        INSERT INTO item_category (item_id, category_id)
        VALUES (${itemId}, ${categoryId})
        ON CONFLICT DO NOTHING
        RETURNING ${CategoryService.allColumns}
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  async delete(id: string, transactionHandler: TrxHandler): Promise<number> {
    return transactionHandler
      .query<number>(
        sql`
        DELETE FROM item_category
        WHERE id = ${id}
        RETURNING *
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }
}
