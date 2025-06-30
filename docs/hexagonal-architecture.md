# Hexagonal Architecture

This architecture is also known as Ports and Adapters.

![Hexagonal Architecture Diagram](https://github.com/brocoders/nestjs-boilerplate/assets/6001723/6a6a763e-d1c9-43cc-910a-617cda3a71db)

## Conceptual Benefits

### Database Interactions

#### Decoupling Services from Database Repositories & Enhanced Testability

Hexagonal architecture uses a structure where services operate independently of the inner workings of repositories. In this architecture, the service layer interacts exclusively with domain entities, remaining unaware of the underlying database entities. Conversely, repositories handle database entities without any knowledge of the domain entities. This clear separation is maintained through the use of mappers, which are responsible for converting data between domain models and persistence entities.

Mappers play a crucial role in breaking the coupling at the column level, ensuring that changes in the database schema do not directly affect the business logic, and vice versa. This decoupling is essential for several reasons:

1. **Modularity**: Services can be developed and maintained independently of the database schema, making the codebase more modular and easier to manage.
2. **Flexibility**: Changes to the database schema, like adding or modifying columns, do not affect the business logic. This reduces the risk of errors and simplifies maintenance. In large-scale projects, this flexibility ensures that evolving database schemas won't disrupt endpoint responses.
3. **Testability**: With database interactions abstracted behind interfaces, it's easier to mock the database during testing. This leads to more reliable and faster tests, as the business logic can be tested independently of the database.

4. **Adaptability**: Applications can adapt to changes in third-party providers or database technologies with minimal impact on the core business logic, enhancing the project's longevity and resilience.

By enforcing these practices, hexagonal architecture ensures a clean separation of concerns, promotes maintainability, and supports robust testing strategies.

### Third-Party Integrations

Given that many applications involve third-party integrations, hexagonal architecture can pay off there as well.

1. **Isolated and Replaceable Integrations**: Third-party integrations are modular and can be easily swapped out without affecting the core business logic. This is particularly advantageous for long-term projects, where you may need to replace one third-party provider with another offering similar services.
2. **Improved Testability and Reliability**: Abstracting third-party services makes it easier to create mock versions, leading to more reliable and faster testing.

## Practical Benefits of Hexagonal Architecture
Hexagonal Architecture is not just a theoretical pattern—it brings real, practical value to your day-to-day development work. Below are a few tangible benefits based on real-world scenarios:

### 1. Pre-defined Structure - No Architectural Decisions

In traditional three-tier designs, engineers often have to think through architecture decisions for every module—where to place files, how to structure services, what the naming conventions should be, and so on. Hexagonal architecture enforces a predefined folder and file structure across modules: from DTOs to services, mappers, entities, and repositories.

This standardization saves cognitive effort and promotes developer productivity and consistency. Your team no longer has to debate "where things go"—they just follow the established pattern.

### 2. Decoupled Business Logic Enables Query Optimization and Swappable ORMs

Suppose you have written a TypeORM-based query in repository layer and built some business logic in the service layer on top of that. In the longer run, you decide to replace this complex TypeOrm query with a raw query for performance:

With hexagonal architecture:
- Your business logic remains intact
- You only need to update the repository implementation and the mappers
- No changes required in the service layer
- This change has zero impact on your business logic

This is a classic example of continuous improvement. Without this architecture, you would have to update both the repository layer implementation and then modify the business logic to accommodate the new response structure.

### 3. Payment Module Example - Platform Abstraction
Use Case: You're building an in-app purchase module. You can organize it like this:

```
payment/
├── domain/
│   └── payment.ts
├── service/
│   └── payment.service.ts
├── infrastructure/
│   └── third-party/
│       ├── google/
│       │   └── google-payment.adapter.ts
│       ├── apple/
│       │   └── apple-payment.adapter.ts
│       └── huawei/
│           └── huawei-payment.adapter.ts
│       └── mappers/
│           └── platform.mapper.ts
│       └── ports/
│           └── payment.port.ts
└── module.ts
```

In this setup:
- Your business logic in `payment.service.ts` interacts only with the payment port interface. It has no concern about any specific payment platform
- Platform-specific details (Google, Apple, Huawei) are encapsulated in their own adapters.
- If you need to replace a payment platform or its API changes, in the future, you just update that specific adapter and mapper
- The core business logic remains completely intact
- Perfect separation of concerns which enables scalability, testability, and platform independence.

### 4. Development Time Efficiency

For modules with simple CRUD operations (where you could traditionally work with 3-tier architecture), the expected additional development time is actually saved due to the integrated code generation tool Hygen. The pre-defined structure and generators make development faster, not slower.

## Description of the module structure

```txt
.
├── domain
│   └── [DOMAIN_ENTITY].ts
├── dto
│   ├── create.dto.ts
│   ├── find-all.dto.ts
│   └── update.dto.ts
├── infrastructure
│   └── persistence
│       ├── document
│       │   ├── document-persistence.module.ts
│       │   ├── entities
│       │   │   └── [SCHEMA].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       ├── relational
│       │   ├── entities
│       │   │   └── [ENTITY].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   ├── relational-persistence.module.ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```

`[DOMAIN ENTITY].ts` represents an entity used in the business logic. Domain entity has no dependencies on the database or any other infrastructure.

`[SCHEMA].ts` represents the **database structure**. It is used in the document-oriented database (MongoDB).

`[ENTITY].ts` represents the **database structure**. It is used in the relational database (PostgreSQL).

`[MAPPER].ts` is a mapper that converts **database entity** to **domain entity** and vice versa.

`[PORT].repository.ts` is a repository **port** that defines the methods for interacting with the database.

`[ADAPTER].repository.ts` is a repository that implements the `[PORT].repository.ts`. It is used to interact with the database.

`infrastructure` folder - contains all the infrastructure-related components such as `persistence`, `uploader`, `senders`, etc.

Each component has `port` and `adapters`. `Port` is interface that define the methods for interacting with the infrastructure. `Adapters` are implementations of the `port`.

## Recommendations

### Repository

Don't try to create universal methods in the repository because they are difficult to extend during the project's life. Instead of this create methods with a single responsibility.

```typescript
// ❌
export class UsersRelationalRepository implements UserRepository {
  async find(condition: UniversalConditionInterface): Promise<User> {
    // ...
  }
}

// ✅
export class UsersRelationalRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    // ...
  }

  async findByRoles(roles: string[]): Promise<User> {
    // ...
  }

  async findByIds(ids: string[]): Promise<User> {
    // ...
  }
}
```

## Pitfalls & Drawbacks

While hexagonal architecture provides significant benefits, there are some considerations to keep in mind:

**Initial Complexity**: Hexagonal Architecture can take more effort to implement initially, but it provides more flexibility and scalability in the long run. You can still use Three-tier architecture, but we recommend using Hexagonal Architecture. Try to create resources via our [CLI](../README.md#usage) - you'll find it takes the same time (maybe even less 🤔) as Three-tier architecture.

**Code Generation Limitations**: While we have integrated Hygen for code generation, it has its own limitations. For example:
- You can't add relations between two entities through Hygen terminal or command line
- Complex customizations may require manual intervention

**AI Tool Integration**: AI tools cannot fully understand the hexagonal structure, making it somewhat difficult to get things done with AI agents like Cursor AI or GitHub Copilot. The tools may not suggest the most appropriate file locations or understand the separation of concerns.

📘 For improving AI effectiveness in large codebases, refer to the official Cursor documentation: [https://docs.cursor.com/guides/advanced/large-codebases](https://docs.cursor.com/guides/advanced/large-codebases)

**Minor Edit Overhead**: Sometimes minor edits in modules can take longer due to the need to update multiple layers (domain, mappers, adapters), though this is offset by the long-term maintainability benefits. 