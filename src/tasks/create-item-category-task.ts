// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { ItemCategory } from '../interfaces/item-category';
import { BaseCategoryTask } from './base-category-task';

type InputType = { itemId?: string; categoryId?: string };

export class CreateItemCategoryTask extends BaseCategoryTask<ItemCategory> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return CreateItemCategoryTask.name;
  }

  constructor(
    input: InputType,
    member: Member,
    CategoryService: CategoryService,
  ) {
    super(member, CategoryService);
    this.input = input ?? {};
  }

  async run(
    handler: DatabaseTransactionHandler,
    _log: FastifyLoggerInstance,
  ): Promise<void> {
    this.status = 'RUNNING';

    // create entry in item-category
    const { itemId, categoryId } = this.input;
    this.targetId = itemId;
    this._result = await this.categoryService.createItemCategory(
      itemId,
      categoryId,
      handler,
    );
    this.status = 'OK';
  }
}
