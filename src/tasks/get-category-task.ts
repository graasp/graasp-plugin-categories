// global
// TOCHANGE import { CategoryNotFound } from '../../../util/graasp-error';
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

export class GetCategoryTask extends BaseCategoryTask<Category> {
  protected categoryId: number;
  get name(): string {
    return GetCategoryTask.name;
  }

  constructor(member: Member, categoryService: CategoryService, categoryId: string) {
    super(member, categoryService);
    this.categoryId = Number(categoryId);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category
    const table_name = "category_age";
    const category = await this.categoryService.get(this.categoryId, table_name, handler);
    //if (!category) throw new CategoryNotFound(categoryId);

    this.status = 'OK';
    this._result = category;
  }
}
