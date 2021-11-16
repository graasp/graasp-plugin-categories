// global
import { ItemService, Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetAllTask} from './tasks/get-all-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { GetDisciplineCategoryTask } from './tasks/get-discipline-category-task';
import { CreateItemCategoryAgeTask, CreateItemCategoryDisciplineTask } from './tasks/create-item-category-task';
import { ItemCategory } from './interfaces/item-category';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;
  private itemService: ItemService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.itemService = this.itemService;
  }

  // CRUD
  getGetTaskName(): string { return GetCategoryTask.name; }
  getGetAllTaskName(): string { return GetAllTask.name;}
  getGetAllDisciplinesTaskName(): string { return GetDisciplineCategoryTask.name; }
  createItemCategoryAgeTaskName(): string { return CreateItemCategoryAgeTask.name; }
  createItemCategoryDisciplineTaskName(): string { return CreateItemCategoryDisciplineTask.name; }
  

  // Other

  // CRUD
  createGetTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask(member, this.categoryService, { categoryId });
  }

  createGetAllTask(member: Member): GetAllTask {
    return new GetAllTask(member, this.categoryService);
  }

  createGetAllDisciplinesTask(member: Member): GetDisciplineCategoryTask {
    return new GetDisciplineCategoryTask(member, this.categoryService);
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
