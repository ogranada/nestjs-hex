This layer contains infrastructure detail interfaces (like databases or input/output) and expose them (A.K.A Ports).
This layer also includes inplementations of use cases (A.K.A Adapters).

E.G.

The abstractions:
```typescript

interface IInformationDisplay {

    showInformation(information: string): void; // Generally, the void means that inside we have a side effect.

}

interface IUserRepository {

    find(uuid: string): User;

    save(): void; // Generally, the void means that inside we have a side effect.

}

```

the implementations
```typescript

class ConsoleInformationDisplay implements IInformationDisplay {

    showInformation(information: string): void { // Generally, the void means that inside we have a side effect.
        console.log(information);
    }

}

class UserRepositoryMongoDBAdapter implements IUserRepository {

    find(uuid: string): User {
        // TODO... a lot of ts code to find something in MongoDB
    }

    save(): void {
        // TODO... a lot of ts code to save something in MongoDB
    }

}

```