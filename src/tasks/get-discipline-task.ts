// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

export class GetCategoryDiscTask extends BaseCategoryTask<Category> {
  protected categoryId: number;
  get name(): string {
    return GetCategoryDiscTask.name;
  }

  constructor(member: Member, categoryId: string, categoryService: CategoryService) {
    super(member, categoryService);
    this.categoryId = Number(categoryId);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category (discipline)
    const category = await this.categoryService.getCategoryDisc(this.categoryId, handler);

    this.status = 'OK';
    this._result = category;
  }
}
