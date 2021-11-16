// global
// TOCHANGE import { CategoryNotFound } from '../../../util/graasp-error';
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

type InputType = { categoryId?: string, tableName?: string };

export class GetCategoryTask extends BaseCategoryTask<Category> {
  get name(): string {
    return GetCategoryTask.name;
  }

  input: InputType;
  getInput: () => InputType;

  constructor(member: Member, categoryService: CategoryService, input?: InputType) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { categoryId, tableName } = this.input;
    this.targetId = categoryId;

    // get Category
    const category = await this.categoryService.get(categoryId, tableName, handler);
    //if (!category) throw new CategoryNotFound(categoryId);

    this.status = 'OK';
    this._result = category;
  }
}
