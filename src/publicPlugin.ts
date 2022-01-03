// global
import { FastifyPluginAsync } from 'fastify';
import { Item, Member } from 'graasp';
import graaspPublicPlugin from 'graasp-plugin-public';

// local
import { CategoryService } from './db-service';
import common, {
  getByCategories,
  getCategories,
  getCategory,
  getCategoryTypes,
  getItemCategories,
} from './schemas';
import { TaskManager } from './task-manager';

const publicPlugin: FastifyPluginAsync = async (fastify) => {
  const {
    taskRunner: runner,
    items: { taskManager: iTM },
    public: {
      items: { taskManager: pITM },
      graaspActor,
      publishedTagId,
    },
  } = fastify;

  // schemas
  fastify.addSchema(common);

  const categoryS = new CategoryService();
  const categoryTaskManager = new TaskManager(categoryS);

  if (!graaspPublicPlugin) {
    throw new Error('Public plugin is not correctly defined');
  }

  // get categories of given type(s)
  fastify.get<{ Querystring: { typeId?: string[] } }>(
    '/categories',
    { schema: getCategories },
    async ({ query, log }) => {
      const task = categoryTaskManager.createGetCategoriesByTypeTask(
        graaspActor as Member,
        query.typeId,
      );
      return runner.runSingle(task, log);
    },
  );

  // get all category types
  fastify.get(
    '/category-types',
    { schema: getCategoryTypes },
    async ({ log }) => {
      const task = categoryTaskManager.createGetCategoryTypesTask(
        graaspActor as Member,
      );
      return runner.runSingle(task, log);
    },
  );

  // get category
  fastify.get<{ Params: { categoryId: string } }>(
    '/categories/:categoryId',
    { schema: getCategory },
    async ({ params: { categoryId }, log }) => {
      const task = categoryTaskManager.createGetCategoryTask(
        graaspActor as Member,
        categoryId,
      );
      return runner.runSingle(task, log);
    },
  );

  // get published items in given categories
  fastify.get<{ Querystring: { categoryId: string[] } }>(
    '/with-categories',
    { schema: getByCategories },
    async ({ query: { categoryId: categoryIds }, log }) => {
      const t1 = categoryTaskManager.createGetItemsByCategoriesTask(
        graaspActor,
        categoryIds,
      );

      // use item manager task to get trigger post hooks (deleted items are removed)
      // todo: use filter out of deleted items?
      const t2 = iTM.createGetManyTask(graaspActor);
      t2.getInput = () => ({
        itemIds: t1.result.map(({ id }) => id),
      });

      // filter out to keep parent published items only
      const t3 = pITM.createFilterPublicItemsTask(graaspActor, {
        tagIds: [publishedTagId],
      });
      t3.getInput = () => ({
        items: t2.result as Item[],
      });

      return runner.runSingleSequence([t1, t2, t3], log);
    },
  );

  // get category of an item
  fastify.get<{ Params: { itemId: string } }>(
    '/:itemId/categories',
    { schema: getItemCategories },
    async ({ params: { itemId }, log }) => {
      const t1 = pITM.createGetPublicItemTask(graaspActor, { itemId });
      const t2 = categoryTaskManager.createGetItemCategoryTask(
        graaspActor,
        itemId,
      );
      return runner.runSingleSequence([t1, t2], log);
    },
  );
};

export default publicPlugin;
