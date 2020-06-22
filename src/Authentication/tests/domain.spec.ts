import { User, UserCredentials } from '../domain/models/user';
import { UserDto } from '../domain/data-transfer-objects/user-dto';
import { DomainError } from '../domain/domain-error';

describe('Authentication', () => {

  describe('Domain', () => {

    describe('User', () => {

      const makeUser = (name='jdoe1', password='ThisIsAStrongPassword123*') =>  () => User.create({
        username: name,
        password: password,
        firstname: 'Jhon',
        lastname: 'Doe',
      } as UserDto);

      it('should instantiate a User entity', () => {
        const user = makeUser()();
        expect(user).toBeTruthy();
      });

      it('should throw an error if the user name is invalid', () => {
        expect(makeUser('jdoe')).toThrow('Invalid user name length, it must be at leat 5 characters');
      });

      it('should throw an error if the password is invalid', () => {
        expect(makeUser(undefined, 'notstrongpass')).toThrow('Invalid user password, the password must contains uppercase characters, lowercase characters, numeric characters and special characters, and a length of 8 characters.');
      });

      it('should extend a user with new data', () => {
        const user = makeUser()();
        const newUser = user.extend({
          firstname: 'Jhonny',
          lastname: 'Cash',
        } as User);
        expect(newUser.firstname).toBe('Jhonny');
        expect(newUser.lastname).toBe('Cash');
        expect(newUser.password.value).toBe(user.password.value);
        expect(newUser.username.value).toBe(user.username.value);
      });

      it('should extend a user with new data', () => {
        const user = makeUser()();
        const newUser = user.extend({
          firstname: 'Jhonny',
          lastname: 'Cash',
        } as User);
        expect(newUser.firstname).toBe('Jhonny');
        expect(newUser.lastname).toBe('Cash');
        expect(newUser.password.value).toBe(user.password.value);
        expect(newUser.username.value).toBe(user.username.value);
      });

      it('should return a full name if is required', () => {
        const user = makeUser()();
        expect(user.firstname).toBe('Jhon');
        expect(user.lastname).toBe('Doe');
        expect(user.getFullName()).toBe('Jhon Doe');
      });

      it('should return data without password', () => {
        const user = makeUser()();
        expect(user.infoWithoutPassword().password).toBeFalsy();
      });

      it('should return data as DTO', () => {
        const user = makeUser('jdoe1', 'ThisIsAPass1+')();
        const userDTO = user.asDTO();
        expect(userDTO.username).toBe('jdoe1');
        expect(userDTO.password).toBe('ThisIsAPass1+');
        expect(userDTO.firstname).toBe('Jhon');
        expect(userDTO.lastname).toBe('Doe');
      });

    });

    describe('UserCredentials', () => {

      it('should create user credentials', () => {
        const makeUserCredentials = () => UserCredentials.create({
          username: 'jdoe1',
          password: 'ThisIsAStrongPassword123*'
        } as UserDto);
        const userCredentials = makeUserCredentials();
        expect(userCredentials).toBeTruthy();
      });

    });

    describe('DomainError', () => {

      it('should create a domain error', () => {
        const err1 = new DomainError();
        expect(err1.getStatus()).toBe(406);
        expect(err1.getResponse().message.join('')).toBe('Domain Error');
      });

    });

  });

});
