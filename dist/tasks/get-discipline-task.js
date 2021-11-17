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
exports.GetCategoryDiscTask = void 0;
const base_category_task_1 = require("./base-category-task");
class GetCategoryDiscTask extends base_category_task_1.BaseCategoryTask {
    constructor(member, categoryId, categoryService) {
        super(member, categoryService);
        this.categoryId = Number(categoryId);
    }
    get name() {
        return GetCategoryDiscTask.name;
    }
    run(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'RUNNING';
            // get Category (discipline)
            console.log("Calling db service");
            const category = yield this.categoryService.getCategoryDisc(this.categoryId, handler);
            //if (!category) throw new CategoryNotFound(categoryId);
            console.log(category.id, category.name);
            this.status = 'OK';
            this._result = category;
        });
    }
}
exports.GetCategoryDiscTask = GetCategoryDiscTask;
