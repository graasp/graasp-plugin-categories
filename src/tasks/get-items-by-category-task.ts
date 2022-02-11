// global
import { Actor, DatabaseTransactionHandler, Item } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { getItemIdsArray } from '../utils';
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
    
    // get the intersection of itemIdsList
    const items = itemIdsList?.reduce((a, b) => a.filter((c) => getItemIdsArray(b).includes(c.id)));
    this.status = 'OK';
    this._result = items;
  }
}
