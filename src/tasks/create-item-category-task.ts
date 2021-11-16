// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler} from 'graasp';
// other services
import { Member, ItemService } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { ItemCategory, ItemCategoryDiscpline, ItemCategoryAge } from '../interfaces/item-category';
import { BaseCategoryTask } from './base-category-task';

export class CreateItemCategoryAgeTask extends BaseCategoryTask<ItemCategory> {
  protected itemService: ItemService;
  get name(): string { return CreateItemCategoryAgeTask.name; }

  constructor(member: Member, data: Partial<ItemCategory>, itemId: string,
              itemService: ItemService, CategoryService: CategoryService) {
    super(member, CategoryService);
    this.itemService = itemService;
    this.data = data;
    this.targetId = itemId;
  }

  async run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void> {
    this.status = 'RUNNING';

    const categoryAge = this.data.categoryAge;

    const itemCategoryAge = new ItemCategoryAge(this.targetId, categoryAge);

    // create age category
    this._result = await this.categoryService.createAge(itemCategoryAge, handler);
    this.status = 'OK';
  }
}

export class CreateItemCategoryDisciplineTask extends BaseCategoryTask<ItemCategory> {
  protected itemService: ItemService;
  get name(): string { return CreateItemCategoryAgeTask.name; }

  constructor(member: Member, data: Partial<ItemCategory>, itemId: string,
              itemService: ItemService, CategoryService: CategoryService) {
    super(member, CategoryService);
    this.itemService = itemService;
    this.data = data;
    this.targetId = itemId;
  }

  async run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void> {
    this.status = 'RUNNING';

    const category = this.data.categoryDiscipline;

    const itemCategoryDiscipline = new ItemCategoryDiscpline(this.targetId, category);

    // create age category
    this._result = await this.categoryService.createDiscipline(itemCategoryDiscipline, handler);
    this.status = 'OK';
  }
}