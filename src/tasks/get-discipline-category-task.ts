// global
import { Member, DatabaseTransactionHandler } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

export class GetDisciplineCategoriesTask extends BaseCategoryTask<Category[]> {
  get name(): string {
    return GetDisciplineCategoriesTask.name;
  }

  constructor(member: Member, categoryService: CategoryService) {
    super(member, categoryService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category
    const allCategories = await this.categoryService.getAllDisplines(handler);

    this.status = 'OK';
    this._result = allCategories;
  }
}
