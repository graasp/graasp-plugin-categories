// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler} from 'graasp';
// other services
import { Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { ItemCategory } from '../interfaces/item-category';
import { BaseCategoryTask } from './base-category-task';

export class CreateItemCategoryTask extends BaseCategoryTask<ItemCategory> {
  get name(): string { return CreateItemCategoryTask.name; }

  constructor(member: Member, data: ItemCategory, itemId: string,
              CategoryService: CategoryService) {
    super(member, CategoryService);
    this.data = data;
    this.targetId = itemId;
  }

  async run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void> {
    this.status = 'RUNNING';

    const categoryId = this.data.categoryId;

    // create age category
    this._result = await this.categoryService.createItemCategory(this.targetId, categoryId, handler);
    this.status = 'OK';
  }
}
