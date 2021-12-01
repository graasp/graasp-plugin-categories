// global
import { Actor, Task } from 'graasp';
// local
import { Category } from './category';
import { ItemCategory } from './item-category';

export interface CategoryTaskManager<A extends Actor = Actor> {
  getGetCategoryTaskName(): string;

  createGetCategoryTask(actor: A, objectId: string): Task<A, Category>;
  createGetCategoriesByTypeTask(actor: A, type: string[]): Task<A, Category[]>;
  createGetItemCategoryTask(actor: A, itemId: string): Task<A, ItemCategory[]>;
}
