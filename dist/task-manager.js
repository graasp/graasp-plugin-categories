"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const get_category_task_1 = require("./tasks/get-category-task");
const get_all_task_1 = require("./tasks/get-all-task");
const get_discipline_category_task_1 = require("./tasks/get-discipline-category-task");
const create_item_category_task_1 = require("./tasks/create-item-category-task");
const create_item_category_discipline_task_1 = require("./tasks/create-item-category-discipline-task");
const get_discipline_task_1 = require("./tasks/get-discipline-task");
const get_items_by_age_1 = require("./tasks/get-items-by-age");
const get_items_by_discipline_1 = require("./tasks/get-items-by-discipline");
class TaskManager {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.itemService = this.itemService;
    }
    // CRUD
    getGetTaskName() { return get_category_task_1.GetCategoryTask.name; }
    getGetCategoryDiscName() { return get_discipline_task_1.GetCategoryDiscTask.name; }
    getGetAllTaskName() { return get_all_task_1.GetAllTask.name; }
    getGetAllDisciplinesTaskName() { return get_discipline_category_task_1.GetDisciplineCategoryTask.name; }
    getGetItemsByAgeName() { return get_items_by_age_1.GetItemsByAge.name; }
    getGetItemsByDiscName() { return get_items_by_discipline_1.GetItemsByDiscipline.name; }
    createItemCategoryAgeTaskName() { return create_item_category_task_1.CreateItemCategoryAgeTask.name; }
    createItemCategoryDisciplineTaskName() { return create_item_category_discipline_task_1.CreateItemCategoryDisciplineTask.name; }
    // Other
    // CRUD
    createGetTask(member, categoryId) {
        return new get_category_task_1.GetCategoryTask(member, categoryId, this.categoryService);
    }
    createGetCategoryDiscTask(member, categoryId) {
        return new get_discipline_task_1.GetCategoryDiscTask(member, categoryId, this.categoryService);
    }
    createGetAllTask(member) {
        return new get_all_task_1.GetAllTask(member, this.categoryService);
    }
    createGetAllDisciplinesTask(member) {
        return new get_discipline_category_task_1.GetDisciplineCategoryTask(member, this.categoryService);
    }
    createGetItemsByAge(member, categoryId) {
        return new get_items_by_age_1.GetItemsByAge(member, categoryId, this.categoryService);
    }
    createGetItemsByDisc(member, categoryId) {
        return new get_items_by_discipline_1.GetItemsByDiscipline(member, categoryId, this.categoryService);
    }
    createCreateItemCategoryAgeTask(member, data, itemId) {
        return new create_item_category_task_1.CreateItemCategoryAgeTask(member, data, itemId, this.itemService, this.categoryService);
    }
    createCreateItemCategoryDisciplineTask(member, data, itemId) {
        return new create_item_category_discipline_task_1.CreateItemCategoryDisciplineTask(member, data, itemId, this.itemService, this.categoryService);
    }
}
exports.TaskManager = TaskManager;
