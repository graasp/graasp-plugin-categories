import { FastifyLoggerInstance } from 'fastify';

import { DatabaseTransactionHandler, TaskStatus } from '@graasp/sdk';
// other services
import { Member } from '@graasp/sdk';

import { ItemCategory } from '../../interfaces/item-category';
import { ItemCategoryService } from '../../item-category-service';
import { BaseItemCategoryTask } from '../base-item-category-task';

type InputType = { itemId?: string; categoryId?: string };

export class CreateItemCategoryTask extends BaseItemCategoryTask<ItemCategory> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return CreateItemCategoryTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    itemCategoryService: ItemCategoryService,
  ) {
    super(member, itemCategoryService);
    this.input = input ?? {};
  }

  async run(
    handler: DatabaseTransactionHandler,
    _log: FastifyLoggerInstance,
  ): Promise<void> {
    this.status = TaskStatus.RUNNING;

    // create entry in item-category
    const { itemId, categoryId } = this.input;
    this.targetId = itemId;
    this._result = await this.itemCategoryService.createItemCategory(
      itemId,
      categoryId,
      handler,
    );
    this.status = TaskStatus.OK;
  }
}
