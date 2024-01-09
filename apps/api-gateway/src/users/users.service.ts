import { UserEntity, UserStub } from '@app/common';
import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserStub.UsersServiceClient;

  constructor(
    @Inject(UserStub.USER_PACKAGE_NAME) private client: ClientGrpc,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserStub.UsersServiceClient>(
      UserStub.USERS_SERVICE_NAME,
    );
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = this.userRepository.create({
        ...userData,
        id: randomUUID(),
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(newUser);

      return {
        ...newUser,
        token: this.getJwtToken({ id: newUser.id }),
      };
    } catch (error) {
      console.error(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    try {
      const foundUser = await this.userRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true },
      });

      if (!foundUser) throw new UnauthorizedException('Invalid credentials');

      const isAuthorized = bcrypt.compareSync(password, foundUser.password);
      if (!isAuthorized) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        ...foundUser,
        token: this.getJwtToken({ id: foundUser.id }),
      };
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UserStub.UpdateUserDto) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.deleteUser({ id });
  }
}
