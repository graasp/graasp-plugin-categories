import { DatabaseTransactionHandler, Member, TaskStatus } from '@graasp/sdk';

import { CategoryService } from '../../db-service';
import { CategoryType } from '../../interfaces/category-type';
import { BaseCategoryTask } from '../base-category-task';

export class GetCategoryTypesTask extends BaseCategoryTask<CategoryType[]> {
  get name(): string {
    return GetCategoryTypesTask.name;
  }

  constructor(member: Member, categoryService: CategoryService) {
    super(member, categoryService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    // get all types
    const types = await this.categoryService.getCategoryTypes(handler);

    this.status = TaskStatus.OK;
    this._result = types;
  }
}
