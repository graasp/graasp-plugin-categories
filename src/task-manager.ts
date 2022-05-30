// global
import { Actor, Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/category/get-category-task';
import { GetCategoriesByTypeTask } from './tasks/category/get-categories-by-type-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { GetItemCategoryTask } from './tasks/item-category/get-item-category-task';
import { GetCategoryTypesTask } from './tasks/category-type/get-category-types-task';
import { CreateItemCategoryTask } from './tasks/item-category/create-item-category-task';
import { DeleteItemCategoryTask } from './tasks/item-category/delete-item-category-task';
import { getItemsByCategoriesTask } from './tasks/get-items-by-category-task';
import { CreateCategoryTypeTask } from './tasks/category-type/create-category-type-task';
import { DeleteCategoryTypeTask } from './tasks/category-type/delete-category-type-task';
import { CreateCategoryTask } from './tasks/category/create-category-task';
import { DeleteCategoryTask } from './tasks/category/delete-category-task';
import { ItemCategoryService } from './item-category-service';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;
  private itemCategoryService: ItemCategoryService;

  constructor(categoryService: CategoryService, itemCategoryService: ItemCategoryService) {
    this.categoryService = categoryService;
    this.itemCategoryService = itemCategoryService;
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
  getCreateCategoryTypeTaskName(): string {
    return CreateCategoryTypeTask.name;
  }
  getDeleteCategoryTypeTaskName(): string {
    return DeleteCategoryTypeTask.name;
  }
  getCreateCategoryTaskName(): string {
    return CreateCategoryTask.name;
  }
  getDeleteCategoryTaskName(): string {
    return DeleteCategoryTask.name;
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
    return new GetItemCategoryTask(member, this.itemCategoryService, { itemId });
  }

  createCreateItemCategoryTask(
    member: Member,
    categoryId: string,
    itemId: string,
  ): CreateItemCategoryTask {
    return new CreateItemCategoryTask(
      { itemId: itemId, categoryId },
      member,
      this.itemCategoryService,
    );
  }

  createDeleteItemCategoryTask(
    member: Member,
    itemCategoryId: string,
  ): DeleteItemCategoryTask {
    return new DeleteItemCategoryTask(
      { itemCategoryId },
      member,
      this.itemCategoryService,
    );
  }

  createCreateCategoryTypeTask(member: Member, name: string): CreateCategoryTypeTask {
    return new CreateCategoryTypeTask(
      { name },
      member,
      this.categoryService,
    );
  }

  createDeleteCategoryTypeTask(member: Member, id: string): DeleteCategoryTypeTask {
    return new DeleteCategoryTypeTask(
      { id },
      member,
      this.categoryService,
    );
  }
  
  createCreateCategoryTask(member: Member, name: string, type: string): CreateCategoryTask {
    return new CreateCategoryTask(
      { name, type },
      member,
      this.categoryService,
    );
  }

  createDeleteCategoryTask(member: Member, id: string): DeleteCategoryTask {
    return new DeleteCategoryTask(
      { id },
      member,
      this.categoryService,
    );
  }
}
