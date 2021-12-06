// global
import { FastifyPluginAsync } from 'fastify';

// local
import { CategoryService } from './db-service';
import { ItemCategory } from './interfaces/item-category';
import common, { create, getOne } from './schemas';
import { TaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const {
    taskRunner: runner
  } = fastify;
  const categoryS = new CategoryService();
  const taskManager = new TaskManager(categoryS);

  // schemas
  fastify.addSchema(common);

  // TODO: should check item rights // not in public
  // TODO --> add one request in public as well
  //get category of an item
  fastify.get<{ Params: { itemId: string }; }>(
    '/:itemId/categories',
    async ({ member, params: { itemId }, log }) => {
      const task = taskManager.createGetItemCategoryTask(member, itemId);
      return runner.runSingle(task, log);
    },
  );

  // insert item category
  fastify.post<{ Params: { itemId: string }; Body: ItemCategory }>(
    '/:itemId/categories', { schema: create },
    async ({ member, params: { itemId }, body, log }) => {
      const task = taskManager.createCreateItemCategoryTask(member, body, itemId);
      return runner.runSingle(task, log);
    },
  );

  // delete item category entry
  fastify.delete<{ Params: { entryId: string }; }>(
    '/item-category/:entryId',
    async ({ member, params: { entryId }, log }) => {
      const task = taskManager.createDeleteItemCategoryTask(member, entryId);
      return runner.runSingle(task, log);
    },
  );
};

export default plugin;
