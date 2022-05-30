// global
import { sql, DatabaseTransactionConnection as TrxHandler } from 'slonik';
import { CategoryService } from './db-service';
// local
import { ItemCategory } from './interfaces/item-category';

/**
 * Database's first layer of abstraction for Categorys
 */
export class ItemCategoryService extends CategoryService {
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
        SELECT ${ItemCategoryService.allColumns}
        FROM item_category
        WHERE item_id = ${id}
        `,
      )
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
        RETURNING ${ItemCategoryService.allColumns}
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
