// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';
import { ItemCategory } from '../interfaces/item-category';

export class GetItemsByDiscipline extends BaseCategoryTask<ItemCategory[]> {
  protected categoryId: string;
  get name(): string {
    return GetItemsByDiscipline.name;
  }

  constructor(member: Member, categoryId: string, categoryService: CategoryService) {
    super(member, categoryService);
    this.categoryId = categoryId;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get Category (age)
    const itemcategory = await this.categoryService.getItemByDiscipline(this.categoryId, handler);
    //if (!category) throw new CategoryNotFound(categoryId);
    //console.log(category.id, category.name);

    this.status = 'OK';
    this._result = itemcategory;
  }
}
