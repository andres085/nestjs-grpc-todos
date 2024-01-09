import { TodoEntity, TodoStub } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: TodoStub.CreateTodoDto): Promise<TodoStub.Todo> {
    const newTodo = this.todoRepository.create({
      id: randomUUID(),
      ...createTodoDto,
    });

    await this.todoRepository.save(newTodo);

    return newTodo;
  }

  async findAll(): Promise<TodoStub.Todos> {
    const todos = await this.todoRepository.find();

    return { todos };
  }

  async findOne(id: string): Promise<TodoStub.Todo> {
    const foundTodo = await this.todoRepository.findOneBy({ id });
    if (!foundTodo)
      throw new NotFoundException(`Todo with id: ${id} not found`);

    return foundTodo;
  }

  async update(
    id: string,
    updateTodoDto: TodoStub.UpdateTodoDto,
  ): Promise<TodoStub.Todo> {
    const todoToUpdate = await this.todoRepository.findOneBy({ id });
    if (!todoToUpdate)
      throw new NotFoundException(`Todo with id: ${id} not found`);

    Object.assign(todoToUpdate, updateTodoDto);

    this.todoRepository.save(todoToUpdate);

    return todoToUpdate;
  }

  async remove(id: string): Promise<TodoStub.Todo> {
    const todoToDelete = await this.findOne(id);
    if (!todoToDelete)
      throw new NotFoundException(`Todo with id: ${id} not found`);

    await this.todoRepository.delete(id);

    return todoToDelete;
  }
}
