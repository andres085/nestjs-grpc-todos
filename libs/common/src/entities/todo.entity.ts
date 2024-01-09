import { UserEntity } from '@app/common';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import * as TodoStub from '../types/todo';

@Entity('todos')
export class TodoEntity {
  @Column()
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'integer',
    enum: TodoStub.Todo_Status,
    default: TodoStub.Todo_Status.PENDING,
  })
  status: TodoStub.Todo_Status;

  @ManyToOne(() => UserEntity, (user) => user.todos, { eager: true })
  user: UserEntity;
}
