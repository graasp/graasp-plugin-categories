// global
import { FastifyLoggerInstance } from 'fastify';
import {
  Actor,
  Task,
  TaskStatus,
  IndividualResultType,
  PreHookHandlerType,
  PostHookHandlerType,
  DatabaseTransactionHandler,
} from 'graasp';
// local
import { ItemCategoryService } from '../item-category-service';

export abstract class BaseItemCategoryTask<R> implements Task<Actor, R> {
  protected itemCategoryService: ItemCategoryService;
  protected _result: R;
  protected _message: string;

  readonly actor: Actor;

  status: TaskStatus;
  targetId: string;
  data: Partial<IndividualResultType<R>>;
  preHookHandler: PreHookHandlerType<R>;
  postHookHandler: PostHookHandlerType<R>;

  constructor(actor: Actor, categoryService: ItemCategoryService) {
    this.actor = actor;
    this.itemCategoryService = categoryService;
    this.status = 'NEW';
  }

  abstract get name(): string;
  get result(): R {
    return this._result;
  }
  get message(): string {
    return this._message;
  }

  abstract run(
    handler: DatabaseTransactionHandler,
    log?: FastifyLoggerInstance,
  ): Promise<void | BaseItemCategoryTask<R>[]>;
}
