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
exports.CreateItemCategoryDisciplineTask = void 0;
const item_category_discipline_1 = require("../interfaces/item-category-discipline");
const base_category_task_1 = require("./base-category-task");
class CreateItemCategoryDisciplineTask extends base_category_task_1.BaseCategoryTask {
    constructor(member, data, itemId, itemService, CategoryService) {
        super(member, CategoryService);
        this.itemService = itemService;
        this.data = data;
        this.targetId = itemId;
    }
    get name() { return CreateItemCategoryDisciplineTask.name; }
    run(handler, log) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'RUNNING';
            const category = this.data.categoryDiscipline;
            const itemCategoryDiscipline = new item_category_discipline_1.ItemCategoryDiscipline(this.targetId, category);
            // create age category
            this._result = yield this.categoryService.createDiscipline(itemCategoryDiscipline, handler);
            this.status = 'OK';
        });
    }
}
exports.CreateItemCategoryDisciplineTask = CreateItemCategoryDisciplineTask;
