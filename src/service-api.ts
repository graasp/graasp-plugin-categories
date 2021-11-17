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

    // get category name
    fastify.get<{ Params: {categoryId: string };}>(
      '/category/age/:categoryId',
      { schema: getOne },
      async ({ member, params: {categoryId}, log }) => {
        const task = taskManager.createGetTask(member, categoryId);
        return runner.runSingle(task, log);
      },
    );

    // get age categories
    fastify.get(
      '/allcategories/age',
      async ({ member, log }) => {
        const task = taskManager.createGetAllTask(member);
        return runner.runSingle(task, log);
      },
    );

        // get discipline categories
    fastify.get(
      '/allcategories/discipline',
      async ({ member, log }) => {
        const task = taskManager.createGetAllDisciplinesTask(member);
        return runner.runSingle(task, log);
      },
    );

    fastify.post<{ Params: { itemId: string }; Body: Partial<ItemCategory> }>(
      '/category/:itemId/age', { schema: create },
      async ({ member, params: { itemId }, body, log }) => {
        const task = taskManager.createCreateItemCategoryAgeTask(member, body, itemId);
        return runner.runSingle(task, log);
      },
    );  
    
    fastify.post<{ Params: { itemId: string }; Body: Partial<ItemCategory> }>(
      '/category/:itemId/discipline', { schema: create },
      async ({ member, params: { itemId }, body, log }) => {
        const task = taskManager.createCreateItemCategoryDisciplineTask(member, body, itemId);
        return runner.runSingle(task, log);
      },
    );      
};

export default plugin;
