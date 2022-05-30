// global
import { Member, DatabaseTransactionHandler } from 'graasp';
// local
import { CategoryService } from '../../db-service';
import { BaseCategoryTask } from '../base-category-task';
import { Category } from '../../interfaces/category';

type InputType = { types?: string[] };

export class GetCategoriesByTypeTask extends BaseCategoryTask<Category[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetCategoriesByTypeTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    categoryService: CategoryService,
  ) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { types } = this.input;

    // get all categories of given type
    const categories = await this.categoryService.getCategoriesByType(
      types,
      handler,
    );

    this.status = 'OK';
    this._result = categories;
  }
}
