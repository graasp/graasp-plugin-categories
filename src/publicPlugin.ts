// global
import { FastifyPluginAsync } from 'fastify';
import { Actor, Member } from 'graasp';

// local
import { CategoryService } from './db-service';
import { TaskManager } from './task-manager';

type GraaspPublicCategoriesOptions = {
    publicActor: Actor
}

/**
 * This public plugin contains completely open calls
 */
const publicPlugin: FastifyPluginAsync<GraaspPublicCategoriesOptions> = async (fastify, options) => {
    const {
        taskRunner: runner,
    } = fastify;
    const { publicActor } = options
    const categoryS = new CategoryService();
    const taskManager = new TaskManager(categoryS);

    // get category info
    fastify.get<{ Params: { categoryId: string }; }>(
        '/categories/:categoryId',
        async ({ params: { categoryId }, log }) => {
            const task = taskManager.createGetCategoryTask(publicActor as Member, categoryId);
            return runner.runSingle(task, log);
        },
    );

    // get types
    fastify.get(
        '/category-types',
        async ({ log }) => {
            const task = taskManager.createGetCategoryTypesTask(publicActor as Member);
            return runner.runSingle(task, log);
        },
    );

    // get categories of given type(s)
    fastify.get<{ Querystring: { type: string[] } }>(
        '/categories',
        async ({ query: { type: typeIds }, log }) => {
            const task = taskManager.createGetCategoriesByTypeTask(publicActor as Member, typeIds);
            return runner.runSingle(task, log);
        },
    );
};

export default publicPlugin
