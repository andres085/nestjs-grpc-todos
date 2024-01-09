import { UserEntity } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../../../libs/common/src/entities/todo.entity';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      synchronize: true,
      entities: [TodoEntity, UserEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class TodoAppModule {}
