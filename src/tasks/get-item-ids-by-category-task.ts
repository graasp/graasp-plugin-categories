import intersectionBy from 'lodash.intersectionby';

import {
  Actor,
  DatabaseTransactionHandler,
  Item,
  TaskStatus,
} from '@graasp/sdk';

import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';

type InputType = { categoryIds?: string[] };

export class GetItemIdsByCategoriesTask extends BaseCategoryTask<Item[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetItemIdsByCategoriesTask.name;
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
    this.status = TaskStatus.RUNNING;

    const { categoryIds } = this.input;

    // get all item ids given category types
    const itemIdsList = await Promise.all(
      categoryIds.map(async (idString) => {
        // split categories if should be combination
        const categoryIdList = idString.split(',');
        const itemIds = await this.categoryService.getItemIdsByCategories(
          categoryIdList,
          handler,
        );
        return itemIds;
      }),
    );

    // get the intersection of all ids
    const itemIds = intersectionBy(...itemIdsList, ({ id }) => id).map(
      ({ id }) => id,
    );
    this.status = TaskStatus.OK;
    this._result = itemIds;
  }
}
