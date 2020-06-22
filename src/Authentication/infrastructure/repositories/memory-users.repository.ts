import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../domain/repositories/users-repository';
import { User, UserCredentials } from '../../domain/models/user';
import { Username } from '../../domain/value-objects/username';
import { UserPassword } from '../../domain/value-objects/userpassword';
import { DomainError } from 'src/Authentication/domain/domain-error';

@Injectable()
export class MemoryUsersRepository implements IUsersRepository {

  private data: User[];

  constructor() {
    this.data = [];
  }

  updatePassword(user: UserCredentials, newPassword: UserPassword): void {
    const storedUser = this.getUserById(user.id);
    if (storedUser && storedUser.password === user.password) {
      this.save(storedUser.extend({ password: newPassword } as User));
    } else {
      throw new DomainError('Invalid user information');
    }
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
    console.log(user);
    const oldUser = this.data.filter(u => u.id === user.id).pop();
    if (oldUser) {
      const idx = this.data.indexOf(oldUser);
      this.data.splice(idx, 1, user);
    } else {
      this.data.push(user);
    }
  }

}
