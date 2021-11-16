import { ItemCategory } from "./item-category";

export class ItemCategoryDiscipline implements ItemCategory {
    itemId: string;
    categoryDiscipline: string;
  
    constructor(itemId: string, categoryDiscipline: string) {
      this.itemId = itemId;
      this.categoryDiscipline = categoryDiscipline;
    }
}