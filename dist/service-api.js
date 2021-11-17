"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// local
const db_service_1 = require("./db-service");
const schemas_1 = __importStar(require("./schemas"));
const task_manager_1 = require("./task-manager");
const plugin = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskRunner: runner } = fastify;
    const categoryS = new db_service_1.CategoryService();
    const taskManager = new task_manager_1.TaskManager(categoryS);
    // schemas
    fastify.addSchema(schemas_1.default);
    // get current user
    fastify.get('/current', ({ member }) => __awaiter(void 0, void 0, void 0, function* () { return member; }));
    // get category name (age group)
    fastify.get('/category/age/:categoryId', ({ member, params: { categoryId }, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetTask(member, categoryId);
        return runner.runSingle(task, log);
    }));
    //get category (discipline)
    fastify.get('/category/discipline/:categoryId', ({ member, params: { categoryId }, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetCategoryDiscTask(member, categoryId);
        return runner.runSingle(task, log);
    }));
    // get age categories
    fastify.get('/allcategories/age', ({ member, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetAllTask(member);
        return runner.runSingle(task, log);
    }));
    // get discipline categories
    fastify.get('/allcategories/discipline', ({ member, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetAllDisciplinesTask(member);
        return runner.runSingle(task, log);
    }));
    // get items in one category (age)
    fastify.get('/age/:categoryId', ({ member, params: { categoryId }, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetItemsByAge(member, categoryId);
        return runner.runSingle(task, log);
    }));
    //get category (discipline)
    fastify.get('/discipline/:categoryId', ({ member, params: { categoryId }, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetItemsByDisc(member, categoryId);
        return runner.runSingle(task, log);
    }));
    // create/update age group for item
    fastify.post('/category/:itemId/age', { schema: schemas_1.create }, ({ member, params: { itemId }, body, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createCreateItemCategoryAgeTask(member, body, itemId);
        return runner.runSingle(task, log);
    }));
    //create/update discipline for item
    fastify.post('/category/:itemId/discipline', { schema: schemas_1.create }, ({ member, params: { itemId }, body, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createCreateItemCategoryDisciplineTask(member, body, itemId);
        return runner.runSingle(task, log);
    }));
});
exports.default = plugin;
