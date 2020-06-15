import { Controller, Get, Post, Body, ValidationPipe, Inject, UseGuards, Req, Res } from '@nestjs/common';
import { Response, json } from 'express';
import { User } from '../domain/models/user';
import { UserDto } from '../domain/data-transfer-objects/user-dto';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/user')
export class AuthenticationController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService
  ) {}


  @UseGuards(AuthGuard('jwt'))
  @Get()
  getApiStatus(): any[] {
    return this.usersService.getUsers();
  }

  @Post()
  registerNewUser(
    @Body(new ValidationPipe({transform: true})) user: UserDto,
    @Res() res: Response
  ) {
    try {
      const newUser = User.create(user);
      this.usersService.createUser(newUser);
      return newUser.infoWithoutPassword();
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  } 

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.usersService.login(req.user);
  }
}
