// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler} from 'graasp';
// other services
import { Member } from 'graasp';
// local
import { CategoryService } from '../db-service';
import { CustomizedTags } from '../interfaces/customized-tags';
import { BaseCategoryTask } from './base-category-task';

type InputType = { itemId?: string, data?: CustomizedTags };

export class UpdateCustomizedTagsTask extends BaseCategoryTask<string> {
  input: InputType;
  getInput: () => InputType;

  get name(): string { return UpdateCustomizedTagsTask.name; }

  constructor(input: InputType, member: Member, CategoryService: CategoryService) {
    super(member, CategoryService);
    this.input = input ?? {};
  }

  async run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void> {
    this.status = 'RUNNING';

    // get settings 
    const settings =await this.categoryService.getSettings(this.input.itemId, handler);
    const { itemId, data } = this.input;
    settings['settings']['tags'] = data.values;
    const newSettings = JSON.stringify(settings['settings']);

    // update tags value in settings
    this._result = await this.categoryService.updateSettings(newSettings, itemId, handler);
    this.status = 'OK';
  }
}
