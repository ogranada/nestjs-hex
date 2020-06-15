import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from './application/users.service';

import { AuthenticationController } from './infrastructure/authentication.controller';
// import { MemoryUsersRepository } from './infrastructure/repositories/memory-users.repository';
import { FileUsersRepository } from './infrastructure/repositories/file-users.repository';
import { LocalStrategy } from './infrastructure/passport/local.strategy';
import { JwtStrategy } from './infrastructure/passport/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'thisisjustasample1',
      signOptions: {
        expiresIn: '1h',
      }
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'UsersService',
      useClass: UsersService
    },
    {
      provide: 'IUsersRepository',
      useClass: FileUsersRepository
      // useClass: MemoryUsersRepository
    },
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule { }
