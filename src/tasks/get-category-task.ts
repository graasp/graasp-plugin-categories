// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

type InputType = { categoryId?: string };

export class GetCategoryTask extends BaseCategoryTask<Category> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetCategoryTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { categoryId } = this.input;
    // get Category (age)
    const category = await this.categoryService.getCategory(categoryId, handler);

    this.status = 'OK';
    this._result = category;
  }
}
