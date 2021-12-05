// global
import { DatabaseTransactionHandler, Member } from 'graasp'
// local
import { CategoryService } from '../db-service';
import { BaseCategoryTask } from './base-category-task';

type InputType = { itemId?: string };

export class GetCustomizedTagsTask extends BaseCategoryTask<string[]> {
  input: InputType;
  getInput: () => InputType;

  get name(): string {
    return GetCustomizedTagsTask.name;
  }

  constructor(input: InputType, member: Member, categoryService: CategoryService) {
    super(member, categoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    const { itemId } = this.input;
    const settings = await this.categoryService.getSettings(itemId, handler);
    const settingValues = settings['settings'];


    this.status = 'OK';
    this._result = settingValues['tags'] || [];
  }
}
