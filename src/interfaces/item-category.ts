export interface ItemCategory {
    itemId: string;
    categoryAge?: string;
    categoryDiscipline?: string;
}

export class ItemCategoryDiscpline implements ItemCategory {
    itemId: string;
    categoryDiscpline: string;
  
    constructor(itemId: string, category: string) {
      this.itemId = itemId;
      this.categoryDiscpline = category;
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
  