// global
import { Actor, DatabaseTransactionHandler } from 'graasp';
// local
import { ItemCategory } from '../../interfaces/item-category';
import { ItemCategoryService } from '../../item-category-service';
import { BaseItemCategoryTask } from '../base-item-category-task';

type InputType = { itemId?: string };

export class GetItemCategoryTask extends BaseItemCategoryTask<ItemCategory[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetItemCategoryTask.name;
  }

  constructor(
    member: Actor,
    itemCategoryService: ItemCategoryService,
    input: InputType,
  ) {
    super(member, itemCategoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { itemId } = this.input;
    this.targetId = itemId;
    const itemCategories = await this.itemCategoryService.getItemCategory(
      itemId,
      handler,
    );

    this.status = 'OK';
    this._result = itemCategories;
  }
}
