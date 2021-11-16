// local

import { ItemCategory } from "./interfaces/item-category";

export class ItemCategoryAge implements ItemCategory {
  itemId: string;
  categoryAge: string;

  constructor(itemId: string, categoryAge: string) {
    this.itemId = itemId;
    this.categoryAge = categoryAge;
  }
}