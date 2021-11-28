// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';

type InputType = { categoryIds?: string[] };

export class GetItemsByCategoryTask extends BaseCategoryTask<string[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetItemsByCategoryTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category (age)
    const { categoryIds } = this.input;
    const items = await this.categoryService.getItemByCategory(categoryIds, handler);

    this.status = 'OK';
    this._result = items;
  }
}