import { Controller, Get, Post, Body, ValidationPipe, Inject, UseGuards, Req, Res, UseFilters, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response, json } from 'express';
import { User } from '../domain/models/user';
import { UserDto } from '../domain/data-transfer-objects/user-dto';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';
import { DomainExceptionFilter } from './error.filter';

@Controller('/api/v1/user')
@UseFilters(new DomainExceptionFilter())
export class AuthenticationController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService
  ) { }


  @UseGuards(AuthGuard('jwt'))
  @Get()
  getApiStatus(): any[] {
    return this.usersService.getUsers();
  }

  @Post()
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
