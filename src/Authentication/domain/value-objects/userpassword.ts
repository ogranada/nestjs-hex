import { DomainError } from "../domain-error";

const PASSWORD_RE = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\+\-])(?=.{8,})');

export class UserPassword {

  constructor(readonly value: string) {
    this.ensureValidFormat(value);
  }

  private ensureValidFormat(value: string) {
    if (!value.match(PASSWORD_RE)) {
      throw new DomainError('Invalid user password, the password must contains uppercase characters, lowercase characters, numeric characters and special characters, and a length of 8 characters.');
    }
  }

}
