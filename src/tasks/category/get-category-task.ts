import { DatabaseTransactionHandler, Member, TaskStatus } from '@graasp/sdk';

import { CategoryService } from '../../db-service';
import { Category } from '../../interfaces/category';
import { BaseCategoryTask } from '../base-category-task';

type InputType = { categoryId?: string };

export class GetCategoryTask extends BaseCategoryTask<Category> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetCategoryTask.name;
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

    const { categoryId } = this.input;
    this.targetId = categoryId;
    const category = await this.categoryService.getCategory(
      categoryId,
      handler,
    );

    this.status = TaskStatus.OK;
    this._result = category;
  }
}
