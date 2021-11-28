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
import { GetItemsByCategoryTask } from './tasks/get-items-by-category-task';

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
  

  // CRUD
  createGetCategoryTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask({categoryId: categoryId}, member, this.categoryService);
  }

  createGetCategoriesByTypeTask(member: Member, types: string[]): GetCategoriesByTypeTask {
    return new GetCategoriesByTypeTask({types: types}, member, this.categoryService);
  }

  createGetCategoryTypesTask(member: Member): GetCategoryTypesTask{
    return new GetCategoryTypesTask(member, this.categoryService);
  }

  createGetItemsByCategoryTask(member: Member, categoryIds: string[]): GetItemsByCategoryTask {
    return new GetItemsByCategoryTask({categoryIds: categoryIds}, member, this.categoryService);
  }

  createGetItemCategoryTask(member: Member, itemId: string): GetItemCategoryTask {
    return new GetItemCategoryTask({itemId: itemId} ,member, this.categoryService);
  }

  createCreateItemCategoryTask(member: Member, data: ItemCategory, itemId: string): CreateItemCategoryTask{
    return new CreateItemCategoryTask({itemId: itemId, data: data}, member, this.categoryService);
  }

  createDeleteItemCategoryTask(member: Member, entryId: string): DeleteItemCategoryTask{
    return new DeleteItemCategoryTask({entryId: entryId}, member, this.categoryService);
  }
}
