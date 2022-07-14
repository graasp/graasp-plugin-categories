import { DatabaseTransactionHandler, Item } from '@graasp/sdk';

import { CATEGORY_IDS_LIST, GRAASP_ACTOR } from '../../test/constants';
import { CategoryService } from '../db-service';
import { GetItemIdsByCategoriesTask } from './get-item-ids-by-category-task';

const handler = {} as unknown as DatabaseTransactionHandler;

const categoryService = new CategoryService();

const actor = GRAASP_ACTOR;

export const MOCK_ITEM_IDS_LIST = [
  [{ id: 'id1' }, { id: 'id2' }] as Item[], // just for test
  [{ id: 'id3' }, { id: 'id2' }] as Item[],
];

export const MOCK_ITEM_IDS_LIST_INTERSECTION = ['id2'];

describe('Get Items By Categories  ', () => {
  it('get intersection of itemIds list', async () => {
    const input = { categoryIds: CATEGORY_IDS_LIST };
    const result = MOCK_ITEM_IDS_LIST;
    const intersection = MOCK_ITEM_IDS_LIST_INTERSECTION;

    const task = new GetItemIdsByCategoriesTask(actor, categoryService, input);
    jest
      .spyOn(categoryService, 'getItemIdsByCategories')
      .mockImplementation(async (categoryIdList) =>
        categoryIdList.length > 1 ? result[0] : result[1],
      );
    await task.run(handler);
    expect(task.result).toEqual(intersection);
  });

  it.only('get intersection with list length be 1', async () => {
    const input = { categoryIds: [CATEGORY_IDS_LIST[0]] };
    const result = [MOCK_ITEM_IDS_LIST[0]];

    const task = new GetItemIdsByCategoriesTask(actor, categoryService, input);
    jest
      .spyOn(categoryService, 'getItemIdsByCategories')
      .mockImplementation(async () => result[0]);
    await task.run(handler);
    expect(task.result).toEqual(MOCK_ITEM_IDS_LIST[0].map(({ id }) => id));
  });
});
