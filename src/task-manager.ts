// global
import { Actor, ItemService, Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetCategoriesByTypeTask } from './tasks/get-categories-by-type-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { GetItemCategoryTask } from './tasks/get-item-category-task';
import { GetCategoryTypesTask } from './tasks/get-category-types-task';
import { CreateItemCategoryTask } from './tasks/create-item-category-task';
import { DeleteItemCategoryTask } from './tasks/delete-item-category-task';
import { getItemsByCategoriesTask } from './tasks/get-items-by-category-task';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;
  private itemService: ItemService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.itemService = this.itemService;
  }

  // CRUD
  getGetCategoriesByTypeTaskName(): string {
    return GetCategoriesByTypeTask.name;
  }
  getGetCategoryTypesTaskName(): string {
    return GetCategoryTypesTask.name;
  }
  getGetCategoryTaskName(): string {
    return GetCategoryTask.name;
  }
  getgetItemsByCategoriesTaskName(): string {
    return getItemsByCategoriesTask.name;
  }
  getGetItemCategoryTaskName(): string {
    return GetItemCategoryTask.name;
  }
  getCreateItemCategoryTaskName(): string {
    return CreateItemCategoryTask.name;
  }
  getDeleteItemCategoryTaskName(): string {
    return DeleteItemCategoryTask.name;
  }

  // CRUD
  createGetCategoryTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask(
      { categoryId: categoryId },
      member,
      this.categoryService,
    );
  }

  createGetCategoriesByTypeTask(
    member: Member,
    types: string[],
  ): GetCategoriesByTypeTask {
    return new GetCategoriesByTypeTask(
      { types: types },
      member,
      this.categoryService,
    );
  }

  createGetCategoryTypesTask(member: Member): GetCategoryTypesTask {
    return new GetCategoryTypesTask(member, this.categoryService);
  }

  createGetItemsByCategoriesTask(
    member: Actor,
    categoryIds: string[],
  ): getItemsByCategoriesTask {
    return new getItemsByCategoriesTask(member, this.categoryService, {
      categoryIds,
    });
  }

  createGetItemCategoryTask(
    member: Actor,
    itemId: string,
  ): GetItemCategoryTask {
    return new GetItemCategoryTask(member, this.categoryService, { itemId });
  }

  createCreateItemCategoryTask(
    member: Member,
    categoryId: string,
    itemId: string,
  ): CreateItemCategoryTask {
    return new CreateItemCategoryTask(
      { itemId: itemId, categoryId },
      member,
      this.categoryService,
    );
  }

  createDeleteItemCategoryTask(
    member: Member,
    itemCategoryId: string,
  ): DeleteItemCategoryTask {
    return new DeleteItemCategoryTask(
      { itemCategoryId },
      member,
      this.categoryService,
    );
  }
}
