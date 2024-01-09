import { TodoStub, UserEntity } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from '../users/users.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: TodoStub.protobufPackage,
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../todo.proto'),
          package: TodoStub.TODO_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
