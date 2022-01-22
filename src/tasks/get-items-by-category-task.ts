// global
import { Actor, DatabaseTransactionHandler, Item } from 'graasp';
import { ListToken } from 'slonik/dist/src/tokens';
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';

type InputType = { categoryIds?: string[] };

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
    
    const itemIdsList = await Promise.all(categoryIds.map(async (idString) => {
      const categoryIdList = idString.split(',');
      const itemIds = await this.categoryService.getItemsByCategories(
        categoryIdList,
        handler
      );
      return itemIds;
    }));

    console.log(itemIdsList);
    const itemIds = itemIdsList.reduce((a, b) => a.filter(c => b.includes(c)));

    const items = itemIds;
    this.status = 'OK';
    this._result = items;
  }
}
