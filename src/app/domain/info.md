Contains all entities that interact and describe the behavior of the system.

E.G.
```typescript

class User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;

    constructor(
      username,
      firstname,
      lastname,
      email) {
        // Avoid to use getters and setters reduce the problems
        // related with Liskov Substitution Principle and Open/Closed principle
        // avoiding side effects.
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    /**
     * Return the user fullname.
     * @returns {string} user full name.
     */
    getFullName(): string {
      // This method allow us to get a smartest model reducing the possibility of an anemic model.
      return `${this.firstname} ${this.lastname}`;
    }

}

```

