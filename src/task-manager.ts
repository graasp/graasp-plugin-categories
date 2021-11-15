// global
import { Member } from 'graasp';
// local
import { CategoryService } from './db-service';
import { GetCategoryTask } from './tasks/get-category-task';
import { GetAllTask} from './tasks/get-all-task';
import { CategoryTaskManager } from './interfaces/category-task-manager';
import { GetDisciplineCategoryTask } from './tasks/get-discipline-category-task';

export class TaskManager implements CategoryTaskManager {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  // CRUD
  getGetTaskName(): string { return GetCategoryTask.name; }
  getGetAllTaskName(): string { return GetAllTask.name;}
  getGetAllDisciplinesTaskName(): string { return GetDisciplineCategoryTask.name; }
  

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Other
}
