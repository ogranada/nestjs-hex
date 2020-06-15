import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../domain/repositories/users-repository';
import { User } from '../../domain/models/user';
import { Username } from '../../domain/value-objects/username';
import { UserPassword } from '../../domain/value-objects/userpassword';

@Injectable()
export class MemoryUsersRepository implements IUsersRepository {

  private data: User[];

  constructor() {
    this.data = [];
  }

  validateUser(username: Username, password: UserPassword): User | null {
    const resp = this.data.filter(user => {
      return user.username.value === username.value
        && user.password.value === password.value;
    });
    return resp.length === 1 ? resp.pop() : null;
  }

  getUsersList(): User[] {
    return this.data.map(user => user.infoWithoutPassword());
  }

  getUserByUsername(username: Username): User {
    return this.data.filter(user => user.username.value === username.value).pop();
  }

  getUserById(id: string): User {
    return this.data.filter(user => user.id === id).pop();
  }

  save(user: User): void {
    this.data.push(user);
  }

}
