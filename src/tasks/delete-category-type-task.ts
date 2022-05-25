// global
import { DatabaseTransactionHandler, Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { CategoryType } from '../interfaces/category-type';
import { BaseCategoryTask } from './base-category-task';

type InputType = { id: string };

export class DeleteCategoryTypeTask extends BaseCategoryTask<CategoryType> {
  input: InputType;

  get name(): string {
    return DeleteCategoryTypeTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get all types
    const { id } = this.input;
    const categoryType = await this.categoryService.DeleteCategoryType(id, handler);

    this.status = 'OK';
    this._result = categoryType;
  }
}
