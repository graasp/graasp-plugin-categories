"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryTask = void 0;
const base_category_task_1 = require("./base-category-task");
class GetCategoryTask extends base_category_task_1.BaseCategoryTask {
    constructor(member, categoryService, input) {
        super(member, categoryService);
        this.input = input !== null && input !== void 0 ? input : {};
    }
    get name() {
        return GetCategoryTask.name;
    }
    run(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'RUNNING';
            const { categoryId } = this.input;
            this.targetId = categoryId;
            // get Category
            const category = yield this.categoryService.get(categoryId, handler);
            //if (!category) throw new CategoryNotFound(categoryId);
            this.status = 'OK';
            this._result = category;
        });
    }
}
exports.GetCategoryTask = GetCategoryTask;
