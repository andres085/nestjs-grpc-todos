import { UserStub } from '@app/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
@UserStub.UsersServiceControllerMethods()
export class UsersController implements UserStub.UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: UserStub.FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UserStub.UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  deleteUser(findOneUserDto: UserStub.FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }
}
