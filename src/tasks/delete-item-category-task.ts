// global
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member } from 'graasp';
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
// local

type InputType = { entryId?: string };

export class DeleteItemCategoryTask extends BaseCategoryTask<Number> {
  input: InputType;
  getInput: () => InputType;

  get name(): string { return DeleteItemCategoryTask.name; }

  constructor(input: InputType, member: Member, CategoryService: CategoryService) {
    super(member, CategoryService);
    this.input = input ?? {};
    }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { entryId } = this.input;
    console.log(entryId);
    // delete item category entry
    const deleted = await this.categoryService.delete(entryId, handler);

    // return item tags
    this.status = 'OK';
    this._result = deleted;
  }
}