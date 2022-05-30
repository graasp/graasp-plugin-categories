// global
import { FastifyPluginAsync } from 'fastify';

// local
import { CategoryService } from './db-service';
import { ItemCategoryService } from './item-category-service';
import common, {
  createCategory,
  createCategoryType,
  deleteById,
} from './schemas';
import { TaskManager } from './task-manager';

const adminPlugin: FastifyPluginAsync = async (fastify) => {
  const {
    taskRunner: runner,
  } = fastify;

  // schemas
  fastify.addSchema(common);

  const categoryS = new CategoryService();
  const itemCategoryS = new ItemCategoryService();
  const taskManager = new TaskManager(categoryS, itemCategoryS);

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

export default adminPlugin;
