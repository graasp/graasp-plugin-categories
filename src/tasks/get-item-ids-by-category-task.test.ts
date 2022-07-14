import { v4 } from 'uuid';

import { DatabaseTransactionHandler, Item } from '@graasp/sdk';

import { GRAASP_ACTOR } from '../../test/constants';
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

// the query string from frontend is in the form of ['A1,A2', 'B1', 'C1,C2,C3']
// where A, B, C denote different category types, and 1, 2 denote different categories within same type
// in test, I choose an example with two categories in one type, and one category in another type to test the syntax
export const CATEGORY_IDS_LIST = [`${v4()},${v4()}`, v4()];

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

  it('get intersection with list length be 1', async () => {
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
