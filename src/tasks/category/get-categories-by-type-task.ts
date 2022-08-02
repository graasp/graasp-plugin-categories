import { DatabaseTransactionHandler, Member, TaskStatus } from '@graasp/sdk';

import { CategoryService } from '../../db-service';
import { Category } from '../../interfaces/category';
import { BaseCategoryTask } from '../base-category-task';

type InputType = { types?: string[] };

export class GetCategoriesByTypeTask extends BaseCategoryTask<Category[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetCategoriesByTypeTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    categoryService: CategoryService,
  ) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const { types } = this.input;

    // get all categories of given type
    const categories = await this.categoryService.getCategoriesByType(
      types,
      handler,
    );

    this.status = TaskStatus.OK;
    this._result = categories;
  }
}
