// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler} from 'graasp';
// other services
import { Member, ItemService } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { ItemCategory, ItemCategoryDiscipline } from '../interfaces/item-category';
import { BaseCategoryTask } from './base-category-task';

export class CreateItemCategoryDisciplineTask extends BaseCategoryTask<ItemCategory> {
    protected itemService: ItemService;
    get name(): string { return CreateItemCategoryDisciplineTask.name; }
  
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
  
      const itemCategoryDiscipline = new ItemCategoryDiscipline(this.targetId, category);
  
      // create age category
      this._result = await this.categoryService.createDiscipline(itemCategoryDiscipline, handler);
      this.status = 'OK';
    }
  }