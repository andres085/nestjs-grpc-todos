import { UserEntity, UserStub } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserStub.Users> {
    const users = await this.userRepository.find({
      relations: ['todos'],
      select: ['id', 'username', 'email', 'todos'],
    });

    return { users };
  }

  async findOne(id: string): Promise<UserStub.User> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    return foundUser;
  }

  async update(id: string, updateUserDto: UserStub.UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate)
      throw new NotFoundException(`User with id: ${id} not found`);

    Object.assign(userToUpdate, updateUserDto);

    this.userRepository.save(userToUpdate);

    return userToUpdate;
  }

  async remove(id: string) {
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete)
      throw new NotFoundException(`User with id: ${id} not found`);

    return userToDelete;
  }
}
