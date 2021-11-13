"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// local
const db_service_1 = require("./db-service");
const schemas_1 = __importDefault(require("./schemas"));
const task_manager_1 = require("./task-manager");
const plugin = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskRunner: runner } = fastify;
    const categoryS = new db_service_1.CategoryService();
    const taskManager = new task_manager_1.TaskManager(categoryS);
    // schemas
    fastify.addSchema(schemas_1.default);
    // get current user
    fastify.get('/current', ({ member }) => __awaiter(void 0, void 0, void 0, function* () { return member; }));
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
    fastify.get('/allcategories', ({ member, log }) => __awaiter(void 0, void 0, void 0, function* () {
        const task = taskManager.createGetAllTask(member);
        return runner.runSingle(task, log);
    }));
});
exports.default = plugin;
