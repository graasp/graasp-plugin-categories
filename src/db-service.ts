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
    id: number,
    dbHandler: TrxHandler,
  ): Promise<Category> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM category_age
        WHERE id = ${id}
        `,
          )
        .then(({ rows }) => rows[0] || null)
    );
  }

  async getCategoryDisc(
    id: number,
    dbHandler: TrxHandler,
  ): Promise<Category> {
    return (
      dbHandler
        .query<Category>(
          sql`
        SELECT *
        FROM category_discipline
        WHERE id = ${id}
        `,
          )
        .then(({ rows }) => rows[0] || null)
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
  ): Promise<ItemCategory> {
    return (
      dbHandler
        .query<ItemCategory>(
          sql`
        SELECT *
        FROM item_category
        WHERE item_id = ${id}
        `,
          )
        .then(({ rows }) => rows[0] || null)
    );
  }

  async getItemByDiscipline(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<ItemCategory[]> {
    return (
      dbHandler
        .query<ItemCategory>(
          sql`
        SELECT *
        FROM item_category
        WHERE category_discipline = ${id}
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async getItemByAge(
    id: string,
    dbHandler: TrxHandler,
  ): Promise<ItemCategory[]> {
    return (
      dbHandler
        .query<ItemCategory>(
          sql`
        SELECT *
        FROM item_category
        WHERE category_age = ${id}
        `,
          )
        .then(({ rows }) => rows.slice(0))
    );
  }

  async createAge(itemCategory: Partial<ItemCategory>, transactionHandler: TrxHandler): Promise<ItemCategory> {
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

  async createDiscipline(itemCategory: Partial<ItemCategory>, transactionHandler: TrxHandler): Promise<ItemCategory> {
    const { itemId, categoryDiscipline } = itemCategory;
    return transactionHandler.query<ItemCategory>(sql`
        INSERT INTO item_category (item_id, category_discipline)
        VALUES (${itemId}, ${categoryDiscipline})
        ON CONFLICT (item_id)
        DO
        UPDATE SET category_discipline = ${categoryDiscipline}
        RETURNING item_id, category_age, category_discipline
      `)
      .then(({ rows }) => rows[0]);
  }

}