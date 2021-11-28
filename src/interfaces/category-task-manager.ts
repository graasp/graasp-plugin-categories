// global
import { Actor, Task } from 'graasp';
// local
import { Category } from './category';

export interface CategoryTaskManager<A extends Actor = Actor> {
  getGetCategoryTaskName(): string;

  createGetCategoryTask(actor: A, objectId: string): Task<A, Category>;
  createGetCategoriesByTypeTask(actor: A, type: string[]): Task<A, Category[]>;
}
