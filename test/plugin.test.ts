import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import {
  ItemMembershipTaskManager,
  ItemTaskManager,
  Task as MockTask,
  TaskRunner,
} from 'graasp-test';

import plugin from '../src/service-api';
import build from './app';
import { CATEGORIES, buildItemCategory } from './constants';

const itemTaskManager = new ItemTaskManager();
const runner = new TaskRunner();
const itemMembershipTaskManager = {} as unknown as ItemMembershipTaskManager;

describe('Categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /:itemId/categories', () => {
    it('Get categories of an item', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      const result = [buildItemCategory()];
      const mockGetTask = jest
        .spyOn(itemTaskManager, 'createGetTaskSequence')
        .mockReturnValue([new MockTask(true)]);
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
      });

      jest
        .spyOn(itemTaskManager, 'createGetTaskSequence')
        .mockReturnValue([new MockTask(true)]);
      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => true);

      const res = await app.inject({
        method: 'GET',
        url: '/invalid-id/categories',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
  describe('POST /:id/categories', () => {
    it('Get categories of an item', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      const mockGetTask = jest.fn().mockReturnValue([new MockTask(true)]);
      itemMembershipTaskManager.createGetOfItemTaskSequence = mockGetTask;
      const itemCategory = buildItemCategory();
      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => itemCategory);

      const res = await app.inject({
        method: 'POST',
        url: `/${v4()}/categories`,
        payload: {
          categoryId: CATEGORIES[0].id,
        },
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(mockGetTask).toHaveBeenCalledTimes(1);
      expect(res.json()).toEqual(itemCategory);
    });
    it('Bad request if id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      const res = await app.inject({
        method: 'POST',
        url: '/invalid-id/categories',
        payload: {
          categoryId: CATEGORIES[0].id,
        },
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Bad request if body is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      const res = await app.inject({
        method: 'POST',
        url: `/${v4()}/categories`,
        payload: {
          categoryId: 'invalid-id',
        },
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
  describe('DELETE /:itemId/categories/:categoryId', () => {
    it('Delete item category', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });
      const result = buildItemCategory();
      const mockGetTask = jest.fn().mockReturnValue([new MockTask(true)]);
      itemMembershipTaskManager.createGetOfItemTaskSequence = mockGetTask;
      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => result);

      const res = await app.inject({
        method: 'DELETE',
        url: `/${v4()}/categories/${v4()}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(result);
      expect(mockGetTask).toHaveBeenCalledTimes(1);
    });
    it('Bad request if item id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });
      const res = await app.inject({
        method: 'DELETE',
        url: `/invalid-id/categories/${v4()}`,
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Bad request if item category id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });
      const res = await app.inject({
        method: 'DELETE',
        url: `/${v4()}/categories/invalid-id`,
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
