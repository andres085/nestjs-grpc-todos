import { UserStub } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOneUser(findOneUserDto: UserStub.FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateUser(@Body() updateUserDto: UserStub.UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteUser(findOneUserDto: UserStub.FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }
}
