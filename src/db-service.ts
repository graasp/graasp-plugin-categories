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

  /**
   * Get all categories in given type
   */
  async getCategoriesByType(
    type: string,
    dbHandler: TrxHandler,
  ): Promise<Category[]> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM all_categories
        WHERE type = ${type}
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
        SELECT *
        FROM item_category
        WHERE item_id = ${id}
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async getItemByCategory(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<ItemCategory[]> {
    return (
      dbHandler
        .query<ItemCategory>(
          sql`
        SELECT *
        FROM item_category
        WHERE category = ${id}
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async createItemCategory(itemId: string, categoryId: string, transactionHandler: TrxHandler): Promise<ItemCategory> {
    return transactionHandler.query<ItemCategory>(sql`
        INSERT INTO item_category (item_id, category)
        VALUES (${itemId}, ${categoryId})
        ON CONFLICT DO NOTHING
        RETURNING item_id, category
      `)
      .then(({ rows }) => rows[0] || null);
  }

  async delete(itemId: string, categoryId: string, transactionHandler: TrxHandler): Promise<ItemCategory> {
    return transactionHandler.query<ItemCategory>(sql`
        DELETE FROM item_category
        WHERE item_id = ${itemId} and category = ${categoryId}
        RETURNING item_id, category
      `)
      .then(({ rows }) => rows[0] || null);
  }

}
