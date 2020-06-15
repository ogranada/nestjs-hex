
const PASSWORD_RE = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

export class UserPassword {
    constructor(readonly value: string) {
        this.ensureValidFormat(value);
    }

    private ensureValidFormat(value: string) {
        if (!value.match(PASSWORD_RE)) {
            throw new Error('Invalid User Password');
        }
    }

}
