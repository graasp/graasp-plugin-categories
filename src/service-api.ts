// global
import { FastifyPluginAsync } from 'fastify';

// local
import { CategoryService } from './db-service';
import common from './schemas';
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

    // get members
    fastify.get(
      '/allcategories',
      async ({ member, log }) => {
        const task = taskManager.createGetAllTask(member);
        return runner.runSingle(task, log);
      },
    );
};

export default plugin;
