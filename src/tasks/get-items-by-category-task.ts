// global
import { Actor, DatabaseTransactionHandler, Item } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';

type InputType = { categoryIds?: string[][] };

export class getItemsByCategoriesTask extends BaseCategoryTask<Item[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return getItemsByCategoriesTask.name;
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

    const { categoryIds } = this.input;
    this.targetId = categoryIds?.join(',');
    const items = await this.categoryService.getItemsByCategories(
      categoryIds,
      handler,
    );

    this.status = 'OK';
    this._result = items;
  }
}
