/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Todo } from "./todo";

export const protobufPackage = "user";

export interface UserEmpty {
}

export interface FindOneUserDto {
  id: string;
}

export interface UpdateUserDto {
  id: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  todos: Todo[];
}

export interface Users {
  users: User[];
}

export const USER_PACKAGE_NAME = "user";

export interface UsersServiceClient {
  findAllUsers(request: UserEmpty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  deleteUser(request: FindOneUserDto): Observable<User>;
}

export interface UsersServiceController {
  findAllUsers(request: UserEmpty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  deleteUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllUsers", "findOneUser", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
