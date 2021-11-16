"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const get_category_task_1 = require("./tasks/get-category-task");
const get_all_task_1 = require("./tasks/get-all-task");
const get_discipline_category_task_1 = require("./tasks/get-discipline-category-task");
const create_item_category_task_1 = require("./tasks/create-item-category-task");
class TaskManager {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.itemService = this.itemService;
    }
    // CRUD
    getGetTaskName() { return get_category_task_1.GetCategoryTask.name; }
    getGetAllTaskName() { return get_all_task_1.GetAllTask.name; }
    getGetAllDisciplinesTaskName() { return get_discipline_category_task_1.GetDisciplineCategoryTask.name; }
    createItemCategoryAgeTaskName() { return create_item_category_task_1.CreateItemCategoryAgeTask.name; }
    // Other
    // CRUD
    createGetTask(member, categoryId) {
        return new get_category_task_1.GetCategoryTask(member, this.categoryService, { categoryId });
    }
    createGetAllTask(member) {
        return new get_all_task_1.GetAllTask(member, this.categoryService);
    }
    createGetAllDisciplinesTask(member) {
        return new get_discipline_category_task_1.GetDisciplineCategoryTask(member, this.categoryService);
    }
    createCreateItemCategoryAgeTask(member, data, itemId) {
        return new create_item_category_task_1.CreateItemCategoryAgeTask(member, data, itemId, this.itemService, this.categoryService);
    }
}
exports.TaskManager = TaskManager;
