// global
import { Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetAllTask} from './tasks/get-all-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  // CRUD
  getGetTaskName(): string { return GetCategoryTask.name; }
  getGetAllTaskName(): string { return GetAllTask.name;}

  // Other

  // CRUD
  createGetTask(member: Member, categoryId: string): GetCategoryTask {
    return new GetCategoryTask(member, this.categoryService, { categoryId });
  }

  createGetAllTask(member: Member): GetAllTask {
    return new GetAllTask(member, this.categoryService);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Other
}
