import { DomainError } from "../domain-error";

const MIN_LENGTH = 5;

export class Username {

  constructor(readonly value: string) {
    this.ensureValidLength(value);
  }

  private ensureValidLength(value: string) {
    if (value.length < MIN_LENGTH) {
      throw new DomainError(`Invalid user name length, it must be at leat ${MIN_LENGTH} characters`);
    }
  }

}
