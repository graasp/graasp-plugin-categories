// global
import { FastifyPluginAsync } from 'fastify';

// local
import { CategoryService } from './db-service';
import { ItemCategory } from './interfaces/item-category';
import common, { create } from './schemas';
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

    // // get member
    // fastify.get(
    //   '/:id',
    //   { schema: getOne },
    //   async ({ category, id , log }) => {
    //     const task = taskManager.createGetTask(category, id);
    //     return runner.runSingle(task, log);
    //   },
    // );

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
};

export default plugin;
