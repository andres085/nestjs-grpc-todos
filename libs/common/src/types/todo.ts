/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

export interface TodoEmpty {
}

export interface Todo {
  id: string;
  title: string;
  status: Todo_Status;
}

export enum Todo_Status {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  UNRECOGNIZED = -1,
}

export interface Todos {
  todos: Todo[];
}

export interface RelatedUser {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface CreateTodoDto {
  user: RelatedUser | undefined;
  title: string;
}

export interface FindOneTodoDto {
  id: string;
}

export interface UpdateTodoDto {
  id: string;
  title: string;
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodosServiceClient {
  createTodo(request: CreateTodoDto): Observable<Todo>;

  findAllTodos(request: TodoEmpty): Observable<Todos>;

  findOneTodo(request: FindOneTodoDto): Observable<Todo>;

  updateTodo(request: UpdateTodoDto): Observable<Todo>;

  deleteTodo(request: FindOneTodoDto): Observable<Todo>;
}

export interface TodosServiceController {
  createTodo(request: CreateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  findAllTodos(request: TodoEmpty): Promise<Todos> | Observable<Todos> | Todos;

  findOneTodo(request: FindOneTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  updateTodo(request: UpdateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  deleteTodo(request: FindOneTodoDto): Promise<Todo> | Observable<Todo> | Todo;
}

export function TodosServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTodo", "findAllTodos", "findOneTodo", "updateTodo", "deleteTodo"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodosService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodosService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODOS_SERVICE_NAME = "TodosService";
