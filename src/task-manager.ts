// global
import { ItemService, Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetAllTask} from './tasks/get-all-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { GetDisciplineCategoriesTask } from './tasks/get-discipline-category-task';
import { CreateItemCategoryAgeTask } from './tasks/create-item-category-task';
import { ItemCategory } from './interfaces/item-category';
import { CreateItemCategoryDisciplineTask } from './tasks/create-item-category-discipline-task';
import { GetCategoryDiscTask } from './tasks/get-discipline-task';
import { GetItemsByAge } from './tasks/get-items-by-age';
import { GetItemsByDiscipline } from './tasks/get-items-by-discipline';
import { GetItemCategoryTask } from './tasks/get-item-category-task';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;
  private itemService: ItemService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.itemService = this.itemService;
  }

  // CRUD
  getGetTaskName(): string { return GetCategoryTask.name; }
  getGetCategoryDiscName(): string { return GetCategoryDiscTask.name }
  getGetAllTaskName(): string { return GetAllTask.name;}
  getGetAllDisciplinesTaskName(): string { return GetDisciplineCategoriesTask.name; }
  getGetItemsByAgeName(): string { return GetItemsByAge.name; }
  getGetItemsByDiscName(): string { return GetItemsByDiscipline.name; }
  getGetItemCategoryTaskName(): string { return GetItemCategoryTask.name; }
  createItemCategoryAgeTaskName(): string { return CreateItemCategoryAgeTask.name; }
  createItemCategoryDisciplineTaskName(): string { return CreateItemCategoryDisciplineTask.name; }
  

  // Other

  // CRUD
  createGetTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask(member, categoryId, this.categoryService);
  }

  createGetCategoryDiscTask(member: Member, categoryId: string): GetCategoryDiscTask {
    return new GetCategoryDiscTask(member, categoryId, this.categoryService);
  }

  createGetAllTask(member: Member): GetAllTask {
    return new GetAllTask(member, this.categoryService);
  }

  createGetAllDisciplinesTask(member: Member): GetDisciplineCategoriesTask {
    return new GetDisciplineCategoriesTask(member, this.categoryService);
  }

  createGetItemsByAge(member: Member, categoryId: string): GetItemsByAge {
    return new GetItemsByAge(member, categoryId, this.categoryService);
  }

  createGetItemsByDisc(member: Member, categoryId: string): GetItemsByDiscipline {
    return new GetItemsByDiscipline(member, categoryId, this.categoryService);
  }

  createGetItemCategoryTask(member: Member, itemId: string): GetItemCategoryTask {
    return new GetItemCategoryTask(member, itemId, this.categoryService);
  }

  createCreateItemCategoryAgeTask(member: Member, data: Partial<ItemCategory>, itemId: string): CreateItemCategoryAgeTask{
    return new CreateItemCategoryAgeTask(member, data, itemId, this.itemService, this.categoryService)
  }

  createCreateItemCategoryDisciplineTask(member: Member, data: Partial<ItemCategory>, itemId: string): CreateItemCategoryDisciplineTask{
    return new CreateItemCategoryDisciplineTask(member, data, itemId, this.itemService, this.categoryService)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Other
}
