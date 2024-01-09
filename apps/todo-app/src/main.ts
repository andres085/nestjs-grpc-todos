import { TodoStub, UserStub } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoAppModule } from './todo-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoAppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../todo.proto'),
          join(__dirname, '../user.proto'),
        ],
        package: [TodoStub.protobufPackage, UserStub.protobufPackage],
      },
    },
  );

  await app.listen();
}
bootstrap();
