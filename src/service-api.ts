// global
import { FastifyPluginAsync } from 'fastify';

// local
import { CategoryService } from './db-service';
import common, { create, createCategory, createCategoryType, deleteById, deleteOne, getItemCategories } from './schemas';
import { TaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const {
    taskRunner: runner,
    items: { taskManager: iTM },
    itemMemberships: { taskManager: iMTM },
  } = fastify;
  const categoryS = new CategoryService();
  const taskManager = new TaskManager(categoryS);

  // schemas
  fastify.addSchema(common);

  //get category of an item
  fastify.get<{ Params: { itemId: string } }>(
    '/:itemId/categories',
    { schema: getItemCategories },
    async ({ member, params: { itemId }, log }) => {
      const t1 = iTM.createGetTaskSequence(member, itemId);
      const t2 = taskManager.createGetItemCategoryTask(member, itemId);
      return runner.runSingleSequence([...t1, t2], log);
    },
  );

  // insert item category
  fastify.post<{ Params: { itemId: string }; Body: { categoryId: string } }>(
    '/:itemId/categories',
    { schema: create },
    async ({ member, params: { itemId }, body: { categoryId }, log }) => {
      const t1 = iMTM.createGetOfItemTaskSequence(member, itemId);
      const task = taskManager.createCreateItemCategoryTask(
        member,
        categoryId,
        itemId,
      );
      return runner.runSingleSequence([...t1, task], log);
    },
  );

  // delete item category entry
  fastify.delete<{ Params: { itemCategoryId: string; itemId: string } }>(
    '/:itemId/categories/:itemCategoryId',
    { schema: deleteOne },
    async ({ member, params: { itemCategoryId, itemId }, log }) => {
      const t1 = iMTM.createGetOfItemTaskSequence(member, itemId);
      const task = taskManager.createDeleteItemCategoryTask(
        member,
        itemCategoryId,
      );
      return runner.runSingleSequence([...t1, task], log);
    },
  );

  // add a category type
  fastify.post<{ Body: { name: string } }>(
    '/category-types',
    { schema: createCategoryType },
    async ({ member, body: { name }, log }) => {
      const task = taskManager.createCreateCategoryTypeTask(
        member,
        name
      );
      return runner.runSingle(task, log);
    },
  );

  // delete a category type
  fastify.delete<{ Params: { id: string }; }>(
    '/category-types/:id',
    { schema: deleteById },
    async ({ member, params: { id }, log }) => {
      const task = taskManager.createDeleteCategoryTypeTask(
        member,
        id
      );
      return runner.runSingle(task, log);
    },
  );

    // add a category
    fastify.post<{ Body: { name: string, type: string } }>(
      '/category',
      { schema: createCategory },
      async ({ member, body: { name, type }, log }) => {
        const task = taskManager.createCreateCategoryTask(
          member,
          name,
          type,
        );
        return runner.runSingle(task, log);
      },
    );
  
    // delete a category
    fastify.delete<{ Params: { id: string }; }>(
      '/category/:id',
      { schema: deleteById },
      async ({ member, params: { id }, log }) => {
        const task = taskManager.createDeleteCategoryTask(
          member,
          id
        );
        return runner.runSingle(task, log);
      },
    );
};

export default plugin;
