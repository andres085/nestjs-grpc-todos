import { TodoStub } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TodosService implements OnModuleInit {
  private todoService: TodoStub.TodosServiceClient;

  constructor(@Inject(TodoStub.TODO_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.todoService = this.client.getService<TodoStub.TodosServiceClient>(
      TodoStub.TODOS_SERVICE_NAME,
    );
  }

  create(createTodoDto: TodoStub.CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  findAll() {
    return this.todoService.findAllTodos({});
  }

  findOne(id: string) {
    return this.todoService.findOneTodo({ id });
  }

  update(id: string, updateTodoDto: TodoStub.UpdateTodoDto) {
    return this.todoService.updateTodo({ id, ...updateTodoDto });
  }

  remove(id: string) {
    return this.todoService.deleteTodo({ id });
  }
}
