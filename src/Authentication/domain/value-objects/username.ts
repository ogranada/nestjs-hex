import { DomainError } from "../domain-error";

export class Username {
    constructor(readonly value: string) {
        this.ensureValidLength(value);
    }

    private ensureValidLength(value: string) {
        if (value.length < 5) {
            throw new DomainError('Invalid User Password');
        }
    }

}
