import { StatusCodes } from 'http-status-codes';
import qs from 'qs';
import { v4 } from 'uuid';

import { PublicItemTaskManager } from 'graasp-plugin-public';
import {
  ItemMembershipTaskManager,
  ItemTaskManager,
  Task as MockTask,
  TaskRunner,
} from 'graasp-test';

import plugin from '../src/publicPlugin';
import build from './app';
import {
  CATEGORIES,
  CATEGORY_TYPES,
  buildItem,
  buildItemCategory,
} from './constants';

const itemTaskManager = new ItemTaskManager();
const runner = new TaskRunner();
const itemMembershipTaskManager = {} as unknown as ItemMembershipTaskManager;
const publicItemTaskManager = {} as unknown as PublicItemTaskManager;

describe('Public Categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /categories', () => {
    it('Get categories', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORIES);

      const res = await app.inject({
        method: 'GET',
        url: '/categories',
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORIES);
    });
    it('Get categories by type', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const typeId = CATEGORY_TYPES[0];

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => [CATEGORIES[0]]);

      const res = await app.inject({
        method: 'GET',
        url: `/categories${qs.stringify(
          { typeId },
          { addQueryPrefix: true, arrayFormat: 'repeat' },
        )}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual([CATEGORIES[0]]);
    });
    it('Throw if type id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: `/categories${qs.stringify(
          { typeId: 'invalid-id' },
          { addQueryPrefix: true, arrayFormat: 'repeat' },
        )}`,
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /category-types', () => {
    it('Get category types', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORY_TYPES);

      const res = await app.inject({
        method: 'GET',
        url: '/category-types',
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORY_TYPES);
    });
  });

  describe('GET /categories/:categoryId', () => {
    it('Get category', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const result = CATEGORIES[0];
      jest.spyOn(runner, 'runSingle').mockImplementation(async () => result);

      const res = await app.inject({
        method: 'GET',
        url: `/categories/${v4()}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(result);
    });
    it('Throw if category id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: '/categories/invalid-id',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /with-categories', () => {
    it('Get items by categories', async () => {
      const result = [buildItem(), buildItem()];
      jest
        .spyOn(itemTaskManager, 'createGetManyTask')
        .mockReturnValue(new MockTask());
      publicItemTaskManager.createFilterPublicItemsTask = jest
        .fn()
        .mockReturnValue(new MockTask());
      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => result);

      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: `/with-categories${qs.stringify(
          { categoryId: [v4()] },
          { addQueryPrefix: true, arrayFormat: 'repeat' },
        )}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(result);
    });
    it('Throw if category id is not defined', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: '/with-categories',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Throw if category id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: `/with-categories${qs.stringify(
          { categoryId: 'invalid-id' },
          { addQueryPrefix: true, arrayFormat: 'repeat' },
        )}`,
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /:itemId/categories', () => {
    it('Get categories of a public item', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const result = [buildItemCategory()];
      const mockGetTask = jest.fn().mockReturnValue(new MockTask());
      publicItemTaskManager.createGetPublicItemTask = mockGetTask;
      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => result);

      const res = await app.inject({
        method: 'GET',
        url: `/${v4()}/categories`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(result);
      expect(mockGetTask).toHaveBeenCalledTimes(1);
    });
    it('Bad request if id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
        publicItemTaskManager,
      });

      const res = await app.inject({
        method: 'GET',
        url: '/invalid-id/categories',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
