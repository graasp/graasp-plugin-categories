import { DatabaseTransactionHandler, Member, TaskStatus } from '@graasp/sdk';

import { CategoryService } from '../../db-service';
import { Category } from '../../interfaces/category';
import { BaseCategoryTask } from '../base-category-task';

type InputType = { id: string };

export class DeleteCategoryTask extends BaseCategoryTask<Category> {
  input: InputType;

  get name(): string {
    return DeleteCategoryTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    categoryService: CategoryService,
  ) {
    super(member, categoryService);
    this.input = input;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const { id } = this.input;
    const category = await this.categoryService.deleteCategory(id, handler);

    this.status = TaskStatus.OK;
    this._result = category;
  }
}
