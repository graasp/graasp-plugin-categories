// global
// TOCHANGE import { CategoryNotFound } from '../../../util/graasp-error';
import { Member, DatabaseTransactionHandler } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { Category } from '../interfaces/category';

export class GetAllTask extends BaseCategoryTask<Category[]> {
  get name(): string {
    return GetAllTask.name;
  }

  constructor(member: Member, categoryService: CategoryService) {
    super(member, categoryService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category
    const allCategories = await this.categoryService.getAll(handler);
    //if (!category) throw new CategoryNotFound(categoryId);

    this.status = 'OK';
    this._result = allCategories;
  }
}
