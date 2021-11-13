// global
import { FastifyLoggerInstance } from 'fastify';
import { Actor, Task, TaskStatus, IndividualResultType, PreHookHandlerType, PostHookHandlerType, DatabaseTransactionHandler } from 'graasp';
import { Member } from 'graasp';
// local
import { CategoryService } from '../db-service';

export abstract class BaseCategoryTask<R> implements Task<Actor, R> {
  protected categoryService: CategoryService;
  protected _result: R;
  protected _message: string;

  readonly actor: Member;

  status: TaskStatus;
  targetId: string;
  data: Partial<IndividualResultType<R>>;
  preHookHandler: PreHookHandlerType<R>;
  postHookHandler: PostHookHandlerType<R>;

  constructor(actor: Member, categoryService: CategoryService) {
    this.actor = actor;
    this.categoryService = categoryService;
    this.status = 'NEW';
  }

  abstract get name(): string;
  get result(): R { return this._result; }
  get message(): string { return this._message; }

  abstract run(handler: DatabaseTransactionHandler, log?: FastifyLoggerInstance): Promise<void | BaseCategoryTask<R>[]>;
}
