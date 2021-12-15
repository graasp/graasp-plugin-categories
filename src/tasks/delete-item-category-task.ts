// global
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member } from 'graasp';
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
// local

type InputType = { itemCategoryId?: string };

export class DeleteItemCategoryTask extends BaseCategoryTask<number> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return DeleteItemCategoryTask.name;
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

    const { itemCategoryId } = this.input;
    this.targetId = itemCategoryId;
    // delete item category entry
    const deleted = await this.categoryService.delete(itemCategoryId, handler);

    // return item tags
    this.status = 'OK';
    this._result = deleted;
  }
}
