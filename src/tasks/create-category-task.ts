// global
import { DatabaseTransactionHandler, Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { Category } from '../interfaces/category';
import { BaseCategoryTask } from './base-category-task';

type InputType = { name: string, type: string };

export class CreateCategoryTask extends BaseCategoryTask<Category> {
  input: InputType;

  get name(): string {
    return CreateCategoryTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get all types
    const { name, type } = this.input;
    const category = await this.categoryService.CreateCategory(name, type, handler);

    this.status = 'OK';
    this._result = category;
  }
}
