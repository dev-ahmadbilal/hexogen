# Hexogen

A CLI tool for generating hexagonal architecture modules in NestJS applications using Hygen templates.

## Features

- Generate complete hexagonal architecture modules with a single command
- Follows NestJS best practices and patterns
- Includes controllers, services, repositories, DTOs, and entities
- Supports TypeORM integration
- Swagger/OpenAPI documentation ready
- Validation pipes included
- Add properties to existing modules
- List available templates
- **Relative path imports** - No dependency on project path configuration
- **Automatic Prettier formatting** of generated files (with timeout protection)
- **Schema-driven generation** from JSON files
- **Automatic common utilities** - Copies pagination and utility files to your project

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

**Other Template Types:**
- seeds/create-relational
- query/add-to-relational-resource

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
│   ├── generate-version/
│   │   └── add-to-relational-resource/
│   ├── query/
│   │   └── add-to-relational-resource/
│   └── seeds/
│       └── create-relational/
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