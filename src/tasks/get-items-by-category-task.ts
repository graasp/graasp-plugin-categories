// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { ItemCategory } from '../interfaces/item-category';

export class GetItemsByCategoryTask extends BaseCategoryTask<ItemCategory[]> {
  protected categoryId: string;
  get name(): string {
    return GetItemsByCategoryTask.name;
  }

  constructor(member: Member, categoryId: string, categoryService: CategoryService) {
    super(member, categoryService);
    this.categoryId = categoryId;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category (age)
    const itemcategory = await this.categoryService.getItemByCategory(this.categoryId, handler);

    this.status = 'OK';
    this._result = itemcategory;
  }
}
