export interface ItemCategory {
    itemId: string;
    categoryAge?: string;
    categoryDiscipline?: string;
}

export class ItemCategoryDiscipline implements ItemCategory {
    itemId: string;
    categoryDiscipline: string;
  
    constructor(itemId: string, categoryDiscipline: string) {
      this.itemId = itemId;
      this.categoryDiscipline = categoryDiscipline;
    }
}

export class ItemCategoryAge implements ItemCategory {
    itemId: string;
    categoryAge: string;
  
    constructor(itemId: string, categoryAge: string) {
      this.itemId = itemId;
      this.categoryAge = categoryAge;
    }
}
  