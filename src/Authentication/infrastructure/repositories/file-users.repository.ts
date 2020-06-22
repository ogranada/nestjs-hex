import { join } from 'path';
import { homedir } from 'os';
import { readFileSync, writeFileSync } from 'fs';

import { User } from 'src/Authentication/domain/models/user';
import { Username } from 'src/Authentication/domain/value-objects/username';
import { UserPassword } from 'src/Authentication/domain/value-objects/userpassword';
import { IUsersRepository } from 'src/Authentication/domain/repositories/users-repository';
import { DomainError } from 'src/Authentication/domain/domain-error';

export class FileUsersRepository implements IUsersRepository {

  private data: User[];
  private filepath: string;

  constructor() {
    this.filepath = join(homedir(), '.hex_storage.json');
    try {
      this.data = JSON.parse(readFileSync(this.filepath).toString()).map(User.create);
      console.log(this.data);
    } catch (error) {
      this.data = [];
      this.saveFile();
    }
  }

  updatePassword(user: User, newPassword: UserPassword): void {
    const storedUser = this.getUserById(user.id);
    if (storedUser && storedUser.password.value === user.password.value) {
      this.save(storedUser.extend({ password: newPassword } as User));
      this.saveFile();
    } else {
      throw new DomainError('Invalid user information');
    }
  }

  private saveFile(): void {
    writeFileSync(this.filepath, JSON.stringify(this.data.map((user: User) => user.asDTO()), null, 2));
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
    const oldUser = this.data.filter(u => u.id === user.id).pop();
    if (oldUser) {
      const idx = this.data.indexOf(oldUser);
      this.data.splice(idx, 1, user);
    } else {
      this.data.push(user);
    }
    this.saveFile();
  }

}
