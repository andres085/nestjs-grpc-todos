import { TodoStub } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../../libs/common/src/types/user';
import { GetUser } from '../users/decorators/get-user.decorator';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @Body() createTodoDto: TodoStub.CreateTodoDto) {
    return this.todosService.create({ ...createTodoDto, user });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: TodoStub.UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
