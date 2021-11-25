// global
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member } from 'graasp';
import { CategoryService } from '../db-service';
import { ItemCategory } from '../interfaces/item-category';
import { BaseCategoryTask } from './base-category-task';
// local


export class DeleteItemCategoryTask extends BaseCategoryTask<ItemCategory> {
  get name(): string { return DeleteItemCategoryTask.name; }

  constructor(member: Member, data: ItemCategory, itemId: string,
              CategoryService: CategoryService) {
    super(member, CategoryService);
    this.data = data;
    this.targetId = itemId;
    }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const categoryId = this.data.categoryId;

    // delete item category entry
    const itemCategory = await this.categoryService.delete(this.targetId, categoryId, handler);

    // return item tags
    this.status = 'OK';
    this._result = itemCategory;
  }
}