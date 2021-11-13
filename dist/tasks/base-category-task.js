"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCategoryTask = void 0;
class BaseCategoryTask {
    constructor(actor, categoryService) {
        this.actor = actor;
        this.categoryService = categoryService;
        this.status = 'NEW';
    }
    get result() { return this._result; }
    get message() { return this._message; }
}
exports.BaseCategoryTask = BaseCategoryTask;
