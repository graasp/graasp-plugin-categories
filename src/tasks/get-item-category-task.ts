// global
// TOCHANGE import { CategoryNotFound } from '../../../util/graasp-error';
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { ItemCategory } from '../interfaces/item-category';

export class GetItemCategoryTask extends BaseCategoryTask<ItemCategory> {
  protected itemId: string;
  get name(): string {
    return GetItemCategoryTask.name;
  }

  constructor(member: Member, itemId: string, categoryService: CategoryService) {
    super(member, categoryService);
    this.itemId = itemId;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    console.log("Calling db service");
    const itemCategory = await this.categoryService.getItemCategory(this.itemId, handler);

    this.status = 'OK';
    this._result = itemCategory;
  }
}
