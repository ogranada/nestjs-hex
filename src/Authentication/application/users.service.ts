import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from "../domain/repositories/users-repository"
import { User } from "../domain/models/user";
import { DomainError } from "../domain/domain-error";

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository') private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService
  ) {
  }

  createUser(user: User): void {
    if(this.usersRepository.getUserById(user.id)) {
      throw new DomainError(`The user with id ${user.id} already exists.`);
    }
    this.usersRepository.save(user);
  }

  getUsers(): User[] {
    return this.usersRepository.getUsersList();
  }

  login(user: User) {
    const payload = user.infoWithoutPassword();
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

}
