// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

export class GetCategoryTask extends BaseCategoryTask<Category> {
  protected categoryId: string;
  get name(): string {
    return GetCategoryTask.name;
  }

  constructor(member: Member, categoryId: string, categoryService: CategoryService) {
    super(member, categoryService);
    this.categoryId = categoryId
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category (age)
    const category = await this.categoryService.getCategory(this.categoryId, handler);

    this.status = 'OK';
    this._result = category;
  }
}
