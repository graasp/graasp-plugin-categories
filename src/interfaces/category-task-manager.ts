// global
import { Actor, Task } from 'graasp';
// local
import { Category } from './category';

export interface CategoryTaskManager<A extends Actor = Actor> {
  getGetTaskName(): string;

  createGetTask(actor: A, objectId: string): Task<A, Category>;
  createGetAllTask(actor: A): Task<A, Category[]>;
}
