import { DatabaseTransactionHandler } from 'graasp';

import { CATEGORY_IDS_LIST, GRAASP_ACTOR, MOCK_ITEM_IDS_LIST, MOCK_ITEM_IDS_LIST_INTERSECTION } from '../../test/constants';
import { CategoryService } from '../db-service';
import { getItemsByCategoriesTask } from './get-items-by-category-task';

const handler = {} as unknown as DatabaseTransactionHandler;

const categoryService = new CategoryService();

const actor = GRAASP_ACTOR;

describe('Get Items By Categories  ', () => {
  it('get intersection of itemIds list', async () => {
    const input = { categoryIds: CATEGORY_IDS_LIST };
    const result = MOCK_ITEM_IDS_LIST;
    const intersection = MOCK_ITEM_IDS_LIST_INTERSECTION;

    const task = new getItemsByCategoriesTask(actor, categoryService, input);
    jest.spyOn(categoryService, 'getItemsByCategories').mockImplementation(async (categoryIdList) => categoryIdList.length > 1 ? result[0] : result[1]);
    await task.run(handler);
    expect(task.result).toEqual(intersection);
  });

  it('get intersection with list length be 1', async () => {
    const input = { categoryIds: [CATEGORY_IDS_LIST[0]] };
    const result = [MOCK_ITEM_IDS_LIST[0]];

    const task = new getItemsByCategoriesTask(actor, categoryService, input);
    jest.spyOn(categoryService, 'getItemsByCategories').mockImplementation(async () => result[0]);
    await task.run(handler);
    expect(task.result).toEqual(MOCK_ITEM_IDS_LIST[0]);
  });
});