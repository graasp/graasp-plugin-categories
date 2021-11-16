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
exports.GetDisciplineCategoryTask = void 0;
const base_category_task_1 = require("./base-category-task");
class GetDisciplineCategoryTask extends base_category_task_1.BaseCategoryTask {
    get name() {
        return GetDisciplineCategoryTask.name;
    }
    constructor(member, categoryService) {
        super(member, categoryService);
    }
    run(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'RUNNING';
            // get Category
            const allCategories = yield this.categoryService.getAllDisplines(handler);
            //if (!category) throw new CategoryNotFound(categoryId);
            this.status = 'OK';
            this._result = allCategories;
        });
    }
}
exports.GetDisciplineCategoryTask = GetDisciplineCategoryTask;
