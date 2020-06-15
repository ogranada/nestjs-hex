import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IUsersRepository } from '../../domain/repositories/users-repository';
import { Username } from '../../domain/value-objects/username';
import { UserPassword } from '../../domain/value-objects/userpassword';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUsersRepository') private readonly usersRepository: IUsersRepository
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.validateUser(new Username(username), new UserPassword(password));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
