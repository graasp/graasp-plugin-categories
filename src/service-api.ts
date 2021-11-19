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

    // get category name (age group)
    fastify.get<{ Params: {categoryId: string };}>(
      '/category/age/:categoryId',
      async ({ member, params: {categoryId}, log }) => {
        const task = taskManager.createGetTask(member, categoryId);
        return runner.runSingle(task, log);
      },
    );

    //get category (discipline)
    fastify.get<{ Params: {categoryId: string };}>(
      '/category/discipline/:categoryId',
      async ({ member, params: {categoryId}, log }) => {
        const task = taskManager.createGetCategoryDiscTask(member, categoryId);
        return runner.runSingle(task, log);
      },
    );

    // get age categories
    fastify.get(
      '/categories/age',
      async ({ member, log }) => {
        const task = taskManager.createGetAllTask(member);
        return runner.runSingle(task, log);
      },
    );

        // get discipline categories
    fastify.get(
      '/categories/discipline',
      async ({ member, log }) => {
        const task = taskManager.createGetAllDisciplinesTask(member);
        return runner.runSingle(task, log);
      },
    );

    // get items in one category (age)
    fastify.get<{ Params: {categoryId: string };}>(
      '/age/:categoryId',
      async ({ member, params: {categoryId}, log }) => {
        const task = taskManager.createGetItemsByAge(member, categoryId);
        return runner.runSingle(task, log);
      },
    );

    //get category (discipline)
    fastify.get<{ Params: {categoryId: string };}>(
      '/discipline/:categoryId',
      async ({ member, params: {categoryId}, log }) => {
        const task = taskManager.createGetItemsByDisc(member, categoryId);
        return runner.runSingle(task, log);
      },
    );

    //get category of an item
    fastify.get<{ Params: {itemId: string };}>(
      '/:itemId/category',
      async ({ member, params: {itemId}, log }) => {
        const task = taskManager.createGetItemCategoryTask(member, itemId);
        return runner.runSingle(task, log);
      },
    );

      // create/update age group for item
    fastify.post<{ Params: { itemId: string }; Body: Partial<ItemCategory> }>(
      '/category/:itemId/age', { schema: create },
      async ({ member, params: { itemId }, body, log }) => {
        const task = taskManager.createCreateItemCategoryAgeTask(member, body, itemId);
        return runner.runSingle(task, log);
      },
    );  
    
    //create/update discipline for item
    fastify.post<{ Params: { itemId: string }; Body: Partial<ItemCategory> }>(
      '/category/:itemId/discipline', { schema: create },
      async ({ member, params: { itemId }, body, log }) => {
        const task = taskManager.createCreateItemCategoryDisciplineTask(member, body, itemId);
        return runner.runSingle(task, log);
      },
    );      
};

export default plugin;
