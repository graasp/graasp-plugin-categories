// global
import { Item } from 'graasp';
import { sql, DatabaseTransactionConnection as TrxHandler } from 'slonik';
// local
import { Category } from './interfaces/category';
import { CategoryType } from './interfaces/category-type';

/**
 * Database's first layer of abstraction for Categorys
 */
export class CategoryService {
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
   * Create a new category type
   * @param name name of new category type
   * @param dbHandler Database handler
   */
  async createCategoryType(name: string, dbHandler: TrxHandler): Promise<CategoryType> {
    return dbHandler
      .query<CategoryType>(
        sql`
        INSERT INTO category_type (name)
        VALUES (${name})
        RETURNING *
        `,
      )
      .then(({ rows }) => rows[0]);
  }

  /**
   * Delete a category type
   * @param id id of the category type to be deleted
   * @param dbHandler Database handler
   */
   async deleteCategoryType(id: string, dbHandler: TrxHandler): Promise<CategoryType> {
    return dbHandler
      .query<CategoryType>(
        sql`
        DELETE FROM category_type
        WHERE id = ${id}
        RETURNING *
        `,
      )
      .then(({ rows }) => rows[0]);
  }

    /**
   * Create a new category
   * @param name name of new category type
   * @param dbHandler Database handler
   */
  async createCategory(name: string, categoryTypeId: string, dbHandler: TrxHandler): Promise<Category> {
    return dbHandler
      .query<Category>(
        sql`
        INSERT INTO category (name, type)
        VALUES (${name}, ${categoryTypeId})
        RETURNING *
        `,
      )
      .then(({ rows }) => rows[0]);
  }

  /**
   * Delete a category
   * @param id id of the category to be deleted
   * @param dbHandler Database handler
   */
   async deleteCategory(id: string, dbHandler: TrxHandler): Promise<Category> {
    return dbHandler
      .query<Category>(
        sql`
        DELETE FROM category
        WHERE id = ${id}
        RETURNING *
        `,
      )
      .then(({ rows }) => rows[0]);
  }

  // Get itemCategories matching given category(s) (intersection)
  async getItemsByCategories(
    ids: string[],
    dbHandler: TrxHandler,
  ): Promise<Item[]> {
    // This sql query first select item_ids that match given categories in each type, find the intersection of item_ids by inner join, and lastly get items by ids
    return dbHandler
      .query<Item>(
        sql`
        SELECT item_id AS id
        FROM item_category
        WHERE category_id IN (${sql.join(ids, sql`, `)})
        GROUP BY item_id
        `,
      ).then(({ rows }) => rows.slice(0));
  }
}
