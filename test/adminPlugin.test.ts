import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import {
  ItemMembershipTaskManager,
  ItemTaskManager,
  TaskRunner,
} from 'graasp-test';

import plugin from '../src/adminPlugin';
import build from './app';
import { CATEGORIES, CATEGORY_TYPES } from './constants';

const itemTaskManager = new ItemTaskManager();
const runner = new TaskRunner();
const itemMembershipTaskManager = {} as unknown as ItemMembershipTaskManager;

describe('Admin Category Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /category-types', () => {
    it('Post category type', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORY_TYPES[0]);

      const res = await app.inject({
        method: 'POST',
        url: '/category-types',
        payload: {
          name: CATEGORY_TYPES[0].name,
        },
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORY_TYPES[0]);
    });
    it('Bad request if payload is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest.spyOn(runner, 'runSingle').mockImplementation(async () => true);

      const res = await app.inject({
        method: 'POST',
        url: '/category-types',
        payload: null,
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE /category-types', () => {
    it('Delete category type', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORY_TYPES[0]);

      const res = await app.inject({
        method: 'DELETE',
        url: `/category-types/${v4()}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORY_TYPES[0]);
    });
    it('Bad request if id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => true);

      const res = await app.inject({
        method: 'DELETE',
        url: '/category-types/invalid-id',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('POST /category', () => {
    it('Post category', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORIES[0]);

      const res = await app.inject({
        method: 'POST',
        url: '/category',
        payload: {
          name: CATEGORIES[0].name,
          type: CATEGORIES[0].type,
        },
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORIES[0]);
    });
    it('Bad request if payload is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest.spyOn(runner, 'runSingle').mockImplementation(async () => true);

      const res = await app.inject({
        method: 'POST',
        url: '/category',
        payload: {
          name: CATEGORIES[0].name,
        },
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Bad request if type is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest.spyOn(runner, 'runSingle').mockImplementation(async () => true);

      const res = await app.inject({
        method: 'POST',
        url: '/category',
        payload: {
          name: CATEGORIES[0].name,
          type: 'invalid-id',
        },
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE /category', () => {
    it('Delete category', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingle')
        .mockImplementation(async () => CATEGORIES[0]);

      const res = await app.inject({
        method: 'DELETE',
        url: `/category/${v4()}`,
      });
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.json()).toEqual(CATEGORIES[0]);
    });
    it('Bad request if id is invalid', async () => {
      const app = await build({
        plugin,
        runner,
        itemMembershipTaskManager,
        itemTaskManager,
      });

      jest
        .spyOn(runner, 'runSingleSequence')
        .mockImplementation(async () => true);

      const res = await app.inject({
        method: 'DELETE',
        url: '/category/invalid-id',
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
