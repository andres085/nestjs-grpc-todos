import { Controller } from '@nestjs/common';
import { TodoStub } from '../../../../libs/common/src';
import { TodosService } from './todos.service';

@Controller()
@TodoStub.TodosServiceControllerMethods()
export class TodosController implements TodoStub.TodosServiceController {
  constructor(private readonly todosService: TodosService) {}

  createTodo(createTodoDto: TodoStub.CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  findAllTodos() {
    return this.todosService.findAll();
  }

  findOneTodo(findOneTodoDto: TodoStub.FindOneTodoDto) {
    return this.todosService.findOne(findOneTodoDto.id);
  }

  updateTodo(updateTodoDto: TodoStub.UpdateTodoDto) {
    return this.todosService.update(updateTodoDto.id, updateTodoDto);
  }

  deleteTodo(findOneTodo: TodoStub.FindOneTodoDto) {
    return this.todosService.remove(findOneTodo.id);
  }
}
