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

  // get current user
  fastify.get('/current', async ({ member }) => member);

    // get category info
  fastify.get<{ Params: {categoryId: string };}>(
    '/categories/:categoryId',
    async ({ member, params: {categoryId}, log }) => {
      const task = taskManager.createGetCategoryTask(member, categoryId);
      return runner.runSingle(task, log);
    },
  );

  // get types
  fastify.get(
    '/category-types',
    async ({ member, log }) => {
      const task = taskManager.createGetCategoryTypesTask(member);
      return runner.runSingle(task, log);
    },
  );

  // get categories of given type(s)
  fastify.get<{ Querystring: {type: string[]}}>(
    '/categories',
    async ({ member, query: {type: typeIds}, log }) => {
      const task = taskManager.createGetCategoriesByTypeTask(member, typeIds);
      return runner.runSingle(task, log);
    },
  );

  //get category of an item
  fastify.get<{ Params: {itemId: string };}>(
    '/:itemId/categories',
    async ({ member, params: {itemId}, log }) => {
      const task = taskManager.createGetItemCategoryTask(member, itemId);
      return runner.runSingle(task, log);
    },
  );

  // get items in given category(ies)
  fastify.get<{ Querystring: {category: string[] };}>(
    '/withCategories',
    async ({ member, query: {category: categoryIds}, log }) => {
      const task = taskManager.createGetItemsByCategoryTask(member, categoryIds);
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
