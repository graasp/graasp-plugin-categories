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
exports.CreateItemCategoryAgeTask = void 0;
const item_category_age_1 = require("../item-category-age");
const base_category_task_1 = require("./base-category-task");
class CreateItemCategoryAgeTask extends base_category_task_1.BaseCategoryTask {
    constructor(member, data, itemId, itemService, CategoryService) {
        super(member, CategoryService);
        this.itemService = itemService;
        this.data = data;
        this.targetId = itemId;
    }
    get name() { return CreateItemCategoryAgeTask.name; }
    run(handler, log) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'RUNNING';
            // get item that the new flag will target
            const item = yield this.itemService.get(this.targetId, handler);
            // if (!item) throw new ItemNotFound(this.targetId);
            const categoryAge = this.data.categoryAge;
            const itemCategoryAge = new item_category_age_1.ItemCategoryAge(item.id, categoryAge);
            // create flag
            this._result = yield this.categoryService.create(itemCategoryAge, handler);
            this.status = 'OK';
        });
    }
}
exports.CreateItemCategoryAgeTask = CreateItemCategoryAgeTask;
