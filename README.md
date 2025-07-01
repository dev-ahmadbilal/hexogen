# Hexogen — Lightning-Fast CRUD API Generator (Faster & Safer Than AI)
[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> 🚀 **Build CRUD APIs instantly — no hallucinations, just real code, faster and more reliable than AI** ⚡

A CLI tool for generating **CRUD APIs with hexagonal architecture** in NestJS applications. Hexogen creates complete, production-ready APIs following hexagonal architecture patterns using Hygen templates.

## Table of Contents

- [Why Hexogen?](#why-hexogen)
- [Perfect For](#perfect-for)
  - [Junior Developers](#-junior-developers)
  - [Developers Who Want Good Architecture Without Complexity](#-developers-who-want-good-architecture-without-complexity)
  - [Teams Starting New Projects](#️-teams-starting-new-projects)
- [Prerequisites](#prerequisites)
  - [Required Dependencies](#required-dependencies)
  - [Project Setup](#project-setup)
  - [Quick Start with Demo Project](#quick-start-with-demo-project)
- [About Hexagonal Architecture](#about-hexagonal-architecture)
- [Features](#features)
  - [Complete Module Generation](#-complete-module-generation)
  - [Interactive Property Addition](#-interactive-property-addition)
  - [Sub-Entity Generation](#-sub-entity-generation)
  - [Versioned Resource Support](#-versioned-resource-support)
  - [Schema-Driven Generation](#-schema-driven-generation)
  - [TypeORM Integration](#-typeorm-integration)
  - [Swagger/OpenAPI Ready](#-swaggeropenapi-ready)
  - [Validation Pipes](#-validation-pipes)
  - [Automatic Prettier Formatting](#-automatic-prettier-formatting)
  - [Relative Path Imports](#-relative-path-imports)
  - [Common Utilities](#-common-utilities)
  - [Template Listing](#-template-listing)
  - [Interactive Prompts](#-interactive-prompts)
  - [Error Handling](#️-error-handling)
- [Installation](#installation)
  - [Global Installation (Recommended)](#global-installation-recommended)
  - [Local Development](#local-development)
- [Usage](#usage)
  - [Generate a New Module/Resource](#generate-a-new-moduleresource)
  - [Using JSON Schema Files](#using-json-schema-files)
    - [Resource Schema Format](#resource-schema-format)
    - [Sub-Entity Schema Format](#sub-entity-schema-format)
  - [Add a Property to a Module](#add-a-property-to-a-module)
  - [List Available Templates](#list-available-templates)
  - [Custom Templates](#custom-templates)
    - [List Custom Templates](#list-custom-templates)
    - [Run Custom Templates](#run-custom-templates)
    - [Custom Template Structure](#custom-template-structure)
    - [Benefits of Custom Templates](#benefits-of-custom-templates)
  - [Show Help and Usage Examples](#show-help-and-usage-examples)
  - [Error Handling](#error-handling)
- [Supported Templates](#supported-templates)
- [Project Structure](#project-structure)
- [Inspiration](#inspiration)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Support](#support)

## Why Hexogen?

Building CRUD APIs with proper hexagonal architecture is time-consuming and error-prone. You need to create controllers, services, repositories, DTOs, entities, mappers, and modules — all following specific patterns and best practices.

**Hexogen solves this problem** by automatically generating complete, production-ready CRUD APIs with hexagonal architecture in NestJS applications. Instead of manually creating all the boilerplate code, you can generate entire API modules with a single command.

> Build CRUD APIs with hexagonal architecture — effortlessly and reliably.

## Perfect For

### 🎓 **Junior Developers**

- **Learn by doing**: Generate proper CRUD APIs with hexagonal architecture without needing to understand all the concepts upfront
- **Best practices built-in**: All generated code follows industry standards and patterns
- **Gradual learning**: Start with generated APIs and gradually understand the architecture as you work with it
- **No architectural decisions**: Focus on business logic while the tool handles the API structure

### 🚀 **Developers Who Want Good Architecture Without Complexity**

- **Simple setup**: No complex boilerplates with overwhelming configurations
- **Minimal learning curve**: Get started immediately without weeks of setup and configuration
- **Clean foundation**: Start with a clean NestJS project and add CRUD APIs with hexagonal architecture as needed
- **No over-engineering**: Avoid advanced boilerplates that include features you don't need yet
- **Gradual adoption**: Add architectural patterns incrementally as your project grows

### 🏗️ **Teams Starting New Projects**

- **Consistent structure**: Everyone follows the same patterns from day one
- **Scalable foundation**: Start simple and scale up as your application grows
- **Reduced setup time**: Get from zero to production-ready CRUD APIs in minutes, not days
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

**[nestjs-hexogen-starter](https://github.com/dev-ahmadbilal/nestjs-hexogen-starter)** - A complete NestJS project with all required dependencies pre-configured, ready to use with hexogen for CRUD API generation.

This starter project includes:

- ✅ NestJS with TypeORM configuration
- ✅ Swagger/OpenAPI setup
- ✅ Class-validator and class-transformer
- ✅ Database connection examples
- ✅ Ready-to-use project structure

**No hexagonal architecture setup required** - just install hexogen and start generating CRUD APIs. The package will automatically create the hexagonal architecture structure for you.

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

## Inspiration

Hexogen was inspired by the excellent implementation of hexagonal architecture in the **[realworld-nestjs-medium-blog](https://github.com/hhsadiq/realworld-nestjs-medium-blog)** project. This project demonstrates a complete Medium clone backend using NestJS, TypeORM, and hexagonal architecture patterns, serving as a real-world example of how these architectural principles can be applied to build production-ready APIs.

The realworld-nestjs-medium-blog project showcases:
- Complete CRUD operations with hexagonal architecture
- TypeORM integration with PostgreSQL
- Comprehensive testing (unit and E2E)
- Swagger documentation
- Docker and CI/CD setup
- Real-world API patterns and best practices

We've taken inspiration from this project's architectural decisions and patterns to create Hexogen, making it easier for developers to implement similar hexagonal architecture patterns in their own NestJS applications.

## Contributing

Please check out our [contributing guidelines](CONTRIBUTING.md) and get in touch!

## Contact

Please feel free to reach out:

- **Email:** [ahmadbilal.3491@gmail.com](mailto:ahmadbilal.3491@gmail.com)
- **LinkedIn:** [Ahmad Bilal](https://www.linkedin.com/in/dev-ahmad-bilal)

I look forward to hearing from you!

## License

MIT

## Support

For issues, questions and suggestions, please open an issue on the GitHub repository.

[build-img]:https://github.com/dev-ahmadbilal/hexogen/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/dev-ahmadbilal/hexogen/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/hexogen
[npm-url]:https://www.npmjs.com/package/hexogen
[issues-img]:https://img.shields.io/github/issues/dev-ahmadbilal/hexogen
[issues-url]:https://github.com/dev-ahmadbilal/hexogen/issues
[codecov-img]:https://codecov.io/gh/dev-ahmadbilal/hexogen/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/dev-ahmadbilal/hexogen
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release