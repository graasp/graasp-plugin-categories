// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { ItemCategory } from '../interfaces/item-category';

type InputType = { itemId?: string };

export class GetItemCategoryTask extends BaseCategoryTask<ItemCategory[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetItemCategoryTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { itemId } = this.input;
    const itemCategories = await this.categoryService.getItemCategory(itemId, handler);

    this.status = 'OK';
    this._result = itemCategories;
  }
}
