"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const get_category_task_1 = require("./tasks/get-category-task");
const get_all_task_1 = require("./tasks/get-all-task");
class TaskManager {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    // CRUD
    getGetTaskName() { return get_category_task_1.GetCategoryTask.name; }
    getGetAllTaskName() { return get_all_task_1.GetAllTask.name; }
    // Other
    // CRUD
    createGetTask(member, categoryId) {
        return new get_category_task_1.GetCategoryTask(member, this.categoryService, { categoryId });
    }
    createGetAllTask(member) {
        return new get_all_task_1.GetAllTask(member, this.categoryService);
    }
}
exports.TaskManager = TaskManager;
