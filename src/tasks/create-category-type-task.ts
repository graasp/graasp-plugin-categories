// global
import { DatabaseTransactionHandler, Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { CategoryType } from '../interfaces/category-type';
import { BaseCategoryTask } from './base-category-task';

type InputType = { name: string };

export class CreateCategoryTypeTask extends BaseCategoryTask<CategoryType> {
  input: InputType;

  get name(): string {
    return CreateCategoryTypeTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get all types
    const { name } = this.input;
    const categoryType = await this.categoryService.CreateCategoryType(name, handler);

    this.status = 'OK';
    this._result = categoryType;
  }
}
