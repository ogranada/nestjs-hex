import { Controller, Get, Post, Body, ValidationPipe, Inject, UseGuards, Req, Res, UseFilters, ExceptionFilter, ArgumentsHost, HttpException, Put, Param } from '@nestjs/common';
import { Response, json } from 'express';
import { User, UserIdPassword } from '../domain/models/user';
import { UserDto, ChangeUserPasswordDto } from '../domain/data-transfer-objects/user-dto';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';
import { DomainExceptionFilter } from './error.filter';
import { UserPassword } from '../domain/value-objects/userpassword';

@Controller('/api/v1/auth')
@UseFilters(new DomainExceptionFilter())
export class AuthenticationController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService
  ) { }


  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  getApiStatus(): any {
    return {
      status: 'OK'
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/user/')
  async changePass(
    @Body(new ValidationPipe({ transform: true })) userData: ChangeUserPasswordDto
  ) {
    const user = UserIdPassword.create({
      id: userData.id,
      password: userData.password
    } as UserDto);
    const res = this.usersService.changeUserPassword(user, new UserPassword(userData.newPassword));
    return {
      message: 'status changed'
    };
  }

  @Post('register')
  registerNewUser(
    @Body(new ValidationPipe({ transform: true })) user: UserDto
  ) {
    const newUser = User.create(user);
    this.usersService.createUser(newUser);
    return newUser.infoWithoutPassword();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.usersService.login(req.user);
  }
}
