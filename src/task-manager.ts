// global
import { ItemService, Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetCategoriesByTypeTask} from './tasks/get-categories-by-type-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { ItemCategory } from './interfaces/item-category';
import { GetItemCategoryTask } from './tasks/get-item-category-task';
import { GetCategoryTypesTask } from './tasks/get-types-task';
import { CreateItemCategoryTask } from './tasks/create-item-category-task';
import { DeleteItemCategoryTask } from './tasks/delete-item-category-task';
import { GetItemsByCategoryTask } from './tasks/get-items-by-category';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;
  private itemService: ItemService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.itemService = this.itemService;
  }

  // CRUD
  getGetCategoriesByTypeTaskName(): string { return GetCategoriesByTypeTask.name; }
  getGetCategoryTypesTaskName(): string { return GetCategoryTypesTask.name; }
  getGetCategoryTaskName(): string { return GetCategoryTask.name; }
  getGetItemsByCategoryTaskName(): string { return GetItemsByCategoryTask.name; }
  getGetItemCategoryTaskName(): string { return GetItemCategoryTask.name; }
  getCreateItemCategoryTaskName(): string { return CreateItemCategoryTask.name; }
  getDeleteItemCategoryTaskName(): string { return DeleteItemCategoryTask.name; }
  

  // Other

  // CRUD
  createGetCategoryTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask(member, categoryId, this.categoryService);
  }

  createGetCategoriesByTypeTask(member: Member, type: string): GetCategoriesByTypeTask {
    return new GetCategoriesByTypeTask({typeName: type}, member, this.categoryService);
  }

  createGetCategoryTypesTask(member: Member): GetCategoryTypesTask{
    return new GetCategoryTypesTask(member, this.categoryService);
  }

  createGetItemsByCategoryTask(member: Member, categoryId: string): GetItemsByCategoryTask {
    return new GetItemsByCategoryTask(member, categoryId, this.categoryService);
  }

  createGetItemCategoryTask(member: Member, itemId: string): GetItemCategoryTask {
    return new GetItemCategoryTask(member, itemId, this.categoryService);
  }

  createCreateItemCategoryTask(member: Member, data: ItemCategory, itemId: string): CreateItemCategoryTask{
    return new CreateItemCategoryTask(member, data, itemId, this.categoryService);
  }

  createDeleteItemCategoryTask(member: Member, data: ItemCategory, itemId: string): DeleteItemCategoryTask{
    return new DeleteItemCategoryTask(member, data, itemId, this.categoryService);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Other
}
