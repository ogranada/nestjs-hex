import { v4 as uuid } from 'uuid';
import { Username } from '../value-objects/username';
import { UserPassword } from '../value-objects/userpassword';
import { UserDto } from '../data-transfer-objects/user-dto';

/** Class to represent a User */
export class User {
  readonly id: string;
  readonly username: Username;
  readonly password: UserPassword;
  readonly firstname: string;
  readonly lastname: string;

  constructor(
    id: string,
    username: Username,
    password: UserPassword,
    firstname: string,
    lastname: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  infoWithoutPassword(): any {
    return {
      id: this.id,
      username: this.username.value,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }

  asDTO(): UserDto {
    return {
      id: this.id,
      username: this.username.value,
      password: this.password.value,
      firstname: this.firstname,
      lastname: this.lastname,
    } as UserDto;
  }

  extend(patch: User): User {
    return new User(
      patch.id || this.id,
      patch.username || this.username,
      patch.password || this.password,
      patch.firstname || this.firstname,
      patch.lastname || this.lastname
    );
  }

  static create(user: UserDto): User {
    return new User(
      user.id || uuid(),
      new Username(user.username),
      new UserPassword(user.password),
      user.firstname,
      user.lastname
    );
  }

}

export class UserIdPassword {
  readonly id: string;
  readonly password: UserPassword;

  constructor(
    id: string,
    password: UserPassword
  ) {
    this.id = id;
    this.password = password;
  }

  static create(user: UserDto): UserIdPassword {
    return new UserIdPassword(
      user.id,
      new UserPassword(user.password),
    );
  }

}
