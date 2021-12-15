// global
import { Actor, DatabaseTransactionHandler } from 'graasp';
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

  constructor(
    member: Actor,
    categoryService: CategoryService,
    input: InputType,
  ) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { itemId } = this.input;
    this.targetId = itemId;
    const itemCategories = await this.categoryService.getItemCategory(
      itemId,
      handler,
    );

    this.status = 'OK';
    this._result = itemCategories;
  }
}
