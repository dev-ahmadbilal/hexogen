# Hexogen

A CLI tool for generating hexagonal architecture modules in NestJS applications using Hygen templates.

## Why Hexogen?

Hexagonal Architecture (also known as Ports and Adapters) is a powerful architectural pattern that provides excellent separation of concerns, testability, and maintainability. However, implementing it manually requires creating many files with specific structures and patterns.

**Hexogen solves this problem** by automatically generating all the boilerplate code needed for hexagonal architecture in NestJS applications. Instead of manually creating controllers, services, repositories, DTOs, entities, mappers, and modules, you can generate complete modules with a single command.

## Perfect For

### 🎓 **Junior Developers**
- **Learn by doing**: Generate proper hexagonal architecture without needing to understand all the concepts upfront
- **Best practices built-in**: All generated code follows industry standards and patterns
- **Gradual learning**: Start with generated code and gradually understand the architecture as you work with it
- **No architectural decisions**: Focus on business logic while the tool handles the structure

### 🚀 **Developers Who Want Good Architecture Without Complexity**
- **Simple setup**: No complex boilerplates with overwhelming configurations
- **Minimal learning curve**: Get started immediately without weeks of setup and configuration
- **Clean foundation**: Start with a clean NestJS project and add hexagonal architecture as needed
- **No over-engineering**: Avoid advanced boilerplates that include features you don't need yet
- **Gradual adoption**: Add architectural patterns incrementally as your project grows

### 🏗️ **Teams Starting New Projects**
- **Consistent structure**: Everyone follows the same patterns from day one
- **Scalable foundation**: Start simple and scale up as your application grows
- **Reduced setup time**: Get from zero to production-ready architecture in minutes, not days
- **Team productivity**: Spend time on features, not on architectural setup and configuration

Hexogen bridges the gap between simple CRUD applications and enterprise-grade architecture, making professional patterns accessible to developers at all levels.

## Prerequisites

Before using hexogen, ensure your NestJS project has the following dependencies and setup:

### Required Dependencies

```bash
npm install @nestjs/typeorm typeorm
npm install @nestjs/swagger swagger-ui-express
npm install class-validator class-transformer
npm install reflect-metadata
```

### Project Setup

1. **NestJS Project**: A properly configured NestJS application
2. **TypeORM**: Configured with your database connection
3. **Swagger**: Set up for API documentation
4. **Validation**: Class-validator and class-transformer for DTO validation
5. **Decorators**: Ensure `reflect-metadata` is imported in your main.ts

### Quick Start with Demo Project

For a complete setup example with all prerequisites configured, check out our demo project:

**[nestjs-hexogen-starter](https://github.com/your-username/nestjs-hexogen-starter)** - A complete NestJS project with all required dependencies pre-configured, ready to use with hexogen for hexagonal architecture generation.

This starter project includes:
- ✅ NestJS with TypeORM configuration
- ✅ Swagger/OpenAPI setup
- ✅ Class-validator and class-transformer
- ✅ Database connection examples
- ✅ Ready-to-use project structure

**No hexagonal architecture setup required** - just install hexogen and start generating resources. The package will automatically create the hexagonal architecture structure for you.

## Hexagonal Architecture

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

**Initial Complexity**: Hexagonal Architecture can take more effort to implement initially, but it provides more flexibility and scalability in the long run. You can still use Three-tier architecture, but we recommend using Hexagonal Architecture. Try to create resources via our [CLI](#usage) - you'll find it takes the same time (maybe even less 🤔) as Three-tier architecture.

**Code Generation Limitations**: While we have integrated Hygen for code generation, it has its own limitations. For example:
- You can't add relations between two entities through Hygen terminal or command line
- Complex customizations may require manual intervention

**AI Tool Integration**: AI tools cannot fully understand the hexagonal structure, making it somewhat difficult to get things done with AI agents like Cursor AI or GitHub Copilot. The tools may not suggest the most appropriate file locations or understand the separation of concerns.

📘 For improving AI effectiveness in large codebases, refer to the official Cursor documentation: [https://docs.cursor.com/guides/advanced/large-codebases](https://docs.cursor.com/guides/advanced/large-codebases)

**Minor Edit Overhead**: Sometimes minor edits in modules can take longer due to the need to update multiple layers (domain, mappers, adapters), though this is offset by the long-term maintainability benefits.

---

## Features

Hexogen provides a comprehensive set of features to make hexagonal architecture implementation seamless and efficient:

### 🚀 **Complete Module Generation**
Generate entire hexagonal architecture modules with a single command. Includes controllers, services, repositories, DTOs, entities, mappers, and modules following NestJS best practices.

**Usage:**
```bash
hexogen generate resource User
# or with shortcut
hexogen g resource User
```

### 📝 **Interactive Property Addition**
Add new properties to existing modules with interactive prompts. Automatically updates DTOs, entities, and mappers across all layers.

**Usage:**
```bash
hexogen add property
```

### 🔄 **Sub-Entity Generation**
Create sub-entities within existing modules, maintaining proper hexagonal architecture structure and relationships.

**Usage:**
```bash
hexogen generate sub-entity
```

### 📊 **Versioned Resource Support**
Generate versioned resources with proper API versioning structure, including version-specific controllers and DTOs.

**Usage:**
```bash
hexogen generate versioned
```

### 🎯 **Schema-Driven Generation**
Generate modules from JSON schema files, automatically creating all necessary files based on your data model.

**Usage:**
```bash
hexogen generate resource --schema user-schema.json
```

### 🔧 **TypeORM Integration**
Built-in support for TypeORM with proper entity definitions, repository patterns, and database integration.

### 📚 **Swagger/OpenAPI Ready**
All generated DTOs include Swagger decorators for automatic API documentation generation.

### ✅ **Validation Pipes**
Generated DTOs include comprehensive validation using class-validator decorators.

### 🎨 **Automatic Prettier Formatting**
All generated files are automatically formatted using Prettier for consistent code style.

### 🔗 **Relative Path Imports**
No dependency on project path configuration - all imports use relative paths for better portability.

### 📦 **Common Utilities**
Automatic copying of pagination utilities and common DTOs to your project for consistent patterns.

### 📋 **Template Listing**
View all available templates and their descriptions to understand what can be generated.

**Usage:**
```bash
hexogen list
```

### 🎯 **Shortcut Commands**
Quick access to common commands with intuitive shortcuts:
- `hexogen g` → `hexogen generate`
- `hexogen g resource` → `hexogen generate resource`
- `hexogen g sub-entity` → `hexogen generate sub-entity`
- `hexogen g versioned` → `hexogen generate versioned`

### 🔍 **Interactive Prompts**
All commands use interactive prompts when parameters are missing, making the tool user-friendly and intuitive.

### 🛡️ **Error Handling**
Robust error handling with graceful fallbacks for missing dependencies like Prettier.

## Common Utilities

Hexogen automatically copies essential utility files to your project's `src/common/` directory:

### 📁 **Copied Files:**
- `src/common/types/pagination-options.ts` - Pagination interface
- `src/common/dto/pagination-response.dto.ts` - Pagination response DTOs
- `src/common/dto/infinity-pagination-response.dto.ts` - Infinity pagination DTOs
- `src/common/infinity-pagination.ts` - Infinity pagination utility function

### 🔄 **Automatic Import Updates:**
All generated templates now import pagination utilities from the local `src/common/` directory:

```typescript
// Generated imports use local common folder
import { IPaginationOptions } from '../../../common/types/pagination-options';
import { PaginationResponseDto } from '../../../common/dto/pagination-response.dto';
```

### ✅ **Benefits:**
- **No external dependencies** - All utilities are self-contained
- **Consistent across projects** - Same pagination structure everywhere
- **Automatic setup** - No manual file copying required
- **Version control friendly** - Utilities are part of your project

## Import Strategy

Hexogen generates files with **relative path imports** instead of absolute paths (like `@src/`). This approach provides several benefits:

### ✅ **Advantages of Relative Paths:**
- **Project-agnostic**: Works with any project structure
- **No configuration dependency**: Doesn't require specific path aliases
- **Flexible**: Projects can use their preferred import strategy
- **Linter-friendly**: ESLint and Prettier can easily convert to absolute paths if configured

### 🔄 **Automatic Conversion:**
If your project uses absolute path imports (e.g., `@src/`), you can configure your linter to automatically convert relative imports to absolute paths:

**ESLint configuration:**
```json
{
  "rules": {
    "import/no-relative-parent-imports": "error"
  }
}
```

**Prettier + TypeScript:**
```json
{
  "importOrder": ["^@src/(.*)$", "^[./]"],
  "importOrderSeparation": true
}
```

### 📁 **Generated Import Examples:**
```typescript
// Instead of: import { UserService } from '@src/users/users.service';
// Generated:  import { UserService } from './users.service';

// Instead of: import { User } from '@src/users/domain/user';
// Generated:  import { User } from './domain/user';

// Instead of: import { TABLES } from '@src/common/constants';
// Generated:  import { TABLES } from '../../../common/constants';
```

## Installation

### Global Installation (Recommended)

```bash
npm install -g hexogen
```

After installation, you can use the CLI from any directory:

```bash
hexogen resource User
```

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Link the package for local development:
   ```bash
   npm link
   ```

## Usage

### Generate a New Module/Resource

#### **Simplified Commands (Recommended)**
```bash
# Generate a main resource
hexogen resource User
hexogen resource User --schema ./schemas/user.json
hexogen resource User --no-prettier

# Generate a sub-entity
hexogen subentity SubItem
hexogen subentity SubItem --schema ./schemas/subitem.json

# Generate a versioned resource
hexogen versioned User
hexogen versioned User --schema ./schemas/user.json
```

#### **Legacy Commands (Still Supported)**
```bash
hexogen g <generator> <name>
# Examples:
hexogen g relational-resource User
hexogen g generate-sub-entity/relational-resource SubItem
hexogen g generate-version/add-to-relational-resource User
hexogen g relational-resource User --schema ./schemas/user.json
hexogen g relational-resource User --no-prettier
```

**Options:**
- `-s, --schema <path>`: Path to schema JSON file for entity definition
- `--no-prettier`: Skip Prettier formatting after generation (useful for large projects)

### Add a Property to a Module

```bash
hexogen add property <module> <property>
# Example:
hexogen add property user name:string
```

### List Available Templates

```bash
hexogen list templates
```

### Show Help and Usage Examples

```bash
hexogen help
```

### Error Handling
- If you specify an unknown generator or property template, the CLI will show available options.
- All commands provide clear success/failure messages.

## Troubleshooting

### "I can't find action 'relational-resource' for generator 'generate'"

This error occurs when Hygen tries to use local templates instead of the package templates. This has been fixed in the latest version. If you're still experiencing issues:

1. Make sure you're using the latest version: `npm update -g hexogen`
2. Try running the command from a different directory
3. Check that there's no local `.hygen` directory or `.hygen.js` file in your project

### Templates Not Found

If you get template-related errors:

1. Verify the installation: `hexogen list templates`
2. Reinstall the package: `npm uninstall -g hexogen && npm install -g hexogen`
3. Check that you're not in a directory with conflicting Hygen configuration

## Supported Templates

**Generators:**
- relational-resource
- generate-sub-entity/relational-resource
- generate-version/add-to-relational-resource

**Property Templates:**
- add-to-relational

> You can add your own templates under the `templates/` directory. The CLI will automatically detect them.

## Project Structure

```
hexogen/
├── bin/
│   └── hexogen.js                 # Entry CLI script
├── templates/
│   ├── generate/
│   │   └── relational-resource/   # Main resource generator
│   ├── property/
│   │   └── add-to-relational/     # Property adder
│   ├── generate-sub-entity/
│   │   └── relational-resource/   # Sub-entity generator
│   └── generate-version/
│       └── add-to-relational-resource/
├── package.json
└── README.md
```

## Adding New Generators

1. Create a new directory under `templates/generate/`, `templates/property/`, etc.
2. Add the necessary template files (`.ejs.t` files)
3. Create `prompt.js` for user input collection (or put prompt logic in `index.js`)
4. Create `index.js` for generator logic
5. The CLI will auto-detect new templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes (add templates, improve CLI, etc.)
4. Add tests if applicable
5. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue on the GitHub repository. 