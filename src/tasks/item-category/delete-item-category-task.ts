// global
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member } from 'graasp';
import { ItemCategoryService } from '../../item-category-service';
import { BaseItemCategoryTask } from '../base-item-category-task';
// local

type InputType = { itemCategoryId?: string };

export class DeleteItemCategoryTask extends BaseItemCategoryTask<number> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return DeleteItemCategoryTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    itemCategoryService: ItemCategoryService,
  ) {
    super(member, itemCategoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { itemCategoryId } = this.input;
    this.targetId = itemCategoryId;
    // delete item category entry
    const deleted = await this.itemCategoryService.delete(itemCategoryId, handler);

    // return item tags
    this.status = 'OK';
    this._result = deleted;
  }
}
