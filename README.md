# Hexogen — Hexagonal Module Generator for NestJS

> 🚀 **Generate enterprise-grade CRUD APIs in seconds — faster and more reliable than AI** ⚡

A CLI tool for generating hexagonal architecture modules in NestJS applications using Hygen templates.

## Why Hexogen?

Hexagonal Architecture (also known as Ports and Adapters) is a powerful architectural pattern that provides excellent separation of concerns, testability, and maintainability. However, implementing it manually requires creating many files with specific structures and patterns.

**Hexogen solves this problem** by automatically generating all the boilerplate code needed for hexagonal architecture in NestJS applications. Instead of manually creating controllers, services, repositories, DTOs, entities, mappers, and modules, you can generate complete modules with a single command.

> Let your NestJS app speak the language of hexagonal architecture — effortlessly.

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

**[nestjs-hexogen-starter](https://github.com/dev-ahmadbilal/nestjs-hexogen-starter)** - A complete NestJS project with all required dependencies pre-configured, ready to use with hexogen for hexagonal architecture generation.

This starter project includes:

- ✅ NestJS with TypeORM configuration
- ✅ Swagger/OpenAPI setup
- ✅ Class-validator and class-transformer
- ✅ Database connection examples
- ✅ Ready-to-use project structure

**No hexagonal architecture setup required** - just install hexogen and start generating resources. The package will automatically create the hexagonal architecture structure for you.

## About Hexagonal Architecture

Hexogen generates code following **Hexagonal Architecture** (also known as Ports and Adapters), a powerful architectural pattern that provides excellent separation of concerns, testability, and maintainability.

📖 **[Learn more about Hexagonal Architecture →](docs/hexagonal-architecture.md)**

## Features

Hexogen provides a comprehensive set of features to make hexagonal architecture implementation seamless and efficient:

### 🚀 **Complete Module Generation**

Generate entire hexagonal architecture modules with a single command. Includes controllers, services, repositories, DTOs, entities, mappers, and modules following NestJS best practices.

**Usage:**

```bash
hexogen resource User
```

### 📝 **Interactive Property Addition**

Add new properties to existing modules with interactive prompts. Automatically updates DTOs, entities, and mappers across all layers.

**Usage:**

```bash
hexogen property
```

### 🔄 **Sub-Entity Generation**

Create sub-entities within existing modules, maintaining proper hexagonal architecture structure and relationships.

**Usage:**

```bash
hexogen subentity SubItem
```

### 📊 **Versioned Resource Support**

Generate versioned resources with proper API versioning structure, including version-specific controllers and DTOs.

**Usage:**

```bash
hexogen versioned User
```

### 🎯 **Schema-Driven Generation**

Generate modules from JSON schema files, automatically creating all necessary files based on your data model.

**Usage:**

```bash
hexogen resource --schema user-schema.json
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
hexogen list templates
```

### 🔍 **Interactive Prompts**

All commands use interactive prompts when parameters are missing, making the tool user-friendly and intuitive.

### 🛡️ **Error Handling**

Robust error handling with graceful fallbacks for missing dependencies like Prettier.

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

### Using JSON Schema Files

To avoid interactive prompts, you can provide a JSON schema file using the `--schema` option. This allows for automated generation and CI/CD integration.

📖 **[Learn how to generate schemas using AI tools →](docs/schema-generation.md)**

#### Resource Schema Format

Create a JSON file (e.g., `user-schema.json`) with the following structure:

```json
{
  "name": "Sample",
  "isAddTestCase": true,
  "functionalities": ["create", "findAll", "findOne", "update", "delete"],
  "fields": [
    {
      "name": "first_name",
      "optional": false,
      "type": "varchar",
      "customType": "",
      "example": "John",
      "dto": true
    },
    {
      "name": "age",
      "optional": true,
      "type": "int",
      "customType": "",
      "example": "30",
      "dto": true
    },
    {
      "name": "metadata",
      "optional": true,
      "type": "json",
      "customType": "",
      "example": "{\"role\": \"admin\"}",
      "dto": false
    },
    {
      "name": "custom_flag",
      "optional": false,
      "type": "boolean",
      "customType": "",
      "example": "true",
      "dto": true
    }
  ]
}
```

**Schema Fields:**

- `name`: The resource name (e.g., "User", "Product")
- `isAddTestCase`: Whether to generate test files (true/false)
- `functionalities`: Array of CRUD operations to generate (create, findAll, findOne, update, delete)
- `fields`: Array of entity properties

**Field Properties:**

- `name`: Property name (e.g., "first_name", "age")
- `optional`: Whether the field is optional (true/false)
- `type`: Database type (varchar, int, boolean, json, etc.)
- `customType`: Custom TypeScript type (leave empty for standard types)
- `example`: Example value for Swagger documentation
- `dto`: Whether to include this field in DTOs (true/false)

#### Sub-Entity Schema Format

Create a JSON file (e.g., `subitem-schema.json`) with the following structure:

```json
{
  "parent": "User",
  "name": "SampleSub",
  "fields": [
    {
      "name": "first_name",
      "optional": false,
      "type": "varchar",
      "customType": "",
      "example": "John"
    },
    {
      "name": "age",
      "optional": true,
      "type": "int",
      "customType": "",
      "example": "30"
    },
    {
      "name": "metadata",
      "optional": true,
      "type": "json",
      "customType": "",
      "example": "{\"role\": \"admin\"}"
    },
    {
      "name": "custom_flag",
      "optional": false,
      "type": "boolean",
      "customType": "",
      "example": "true"
    }
  ]
}
```

**Schema Fields:**

- `parent`: The parent resource name (e.g., "User")
- `name`: The sub-entity name (e.g., "Address", "Profile")
- `fields`: Array of entity properties (same structure as resource fields, but without the `dto` property)

**Usage Examples:**

```bash
# Generate resource from schema
hexogen resource --schema ./schemas/user.json

# Generate sub-entity from schema
hexogen subentity --schema ./schemas/address.json

# Generate without prettier formatting
hexogen resource --schema ./schemas/product.json --no-prettier
```

### Add a Property to a Module

```bash
hexogen property
```

### List Available Templates

```bash
hexogen list templates
```

### Custom Templates

Hexogen supports custom templates stored in a `.hexogen` folder in your project root. This allows you to create project-specific templates that extend the built-in functionality.

#### List Custom Templates

```bash
hexogen custom:list
```

#### Run Custom Templates

```bash
# Basic usage
hexogen custom generate/my-template

# With name parameter
hexogen custom generate/my-template --name User

# With schema file
hexogen custom generate/my-template --schema ./schemas/user.json

# Skip prettier formatting
hexogen custom generate/my-template --name User --no-prettier
```

#### Custom Template Structure

Create a `.hexogen` folder in your project root with the following structure:

```
.hexogen/
├── generate/
│   ├── my-custom-template/
│   │   ├── prompt.js
│   │   └── [template files]
│   └── another-template/
├── property/
│   └── custom-property/
└── [other categories]/
```

**Template Categories:**

- `generate/` - For generating new resources/modules
- `property/` - For adding properties to existing modules
- `generate-sub-entity/` - For generating sub-entities
- `generate-version/` - For generating versioned resources
- Any other category you prefer

**Template Requirements:**

- Each template must have a `prompt.js` file
- Follow Hygen template structure and conventions
- Use the same parameter names as built-in templates for consistency

#### Benefits of Custom Templates

- **Project-specific patterns**: Create templates tailored to your project's conventions
- **Team consistency**: Share templates across your team
- **Extended functionality**: Add features not available in built-in templates
- **Version control**: Track template changes with your project
- **Easy maintenance**: Update templates without affecting the global installation

### Show Help and Usage Examples

```bash
hexogen help
```

**Options:**

- `-s, --schema <path>`: Path to schema JSON file for entity definition
- `--no-prettier`: Skip Prettier formatting after generation (useful for large projects)

### Error Handling

- All commands provide clear success/failure messages.
- Interactive prompts guide you through the process when parameters are missing.

## Supported Templates

**Available Templates:**

- resource
- subentity
- versioned
- property

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
├── common/                        # Common utilities
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes (add templates, improve CLI, etc.)
4. Add tests if applicable
5. Submit a pull request

## License

MIT

## Support

For issues, questions and suggestions, please open an issue on the GitHub repository.
