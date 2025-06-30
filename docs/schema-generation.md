# Schema Generation with AI

Hexogen supports JSON schema files to avoid interactive prompts and enable automated generation. You can use AI tools like **Cursor AI** to help generate these schema files from SQL statements or natural language descriptions.

## Overview

Instead of manually creating JSON schema files, you can use AI tools to automatically generate them from:

- SQL `CREATE TABLE` statements
- Natural language descriptions of your entities
- Existing database schemas

This approach saves time and ensures consistency across your project.

## Using Cursor AI to Generate Schemas

### Step 1: Prepare Your Input

Gather one of the following:

- A SQL `CREATE TABLE` statement
- A natural language description of your entity and its fields
- An existing database table definition

### Step 2: Use the AI Prompt Template

Copy and paste the following prompt into Cursor AI. Replace the placeholder at the bottom with your actual input:

<details>
<summary>📋 Click to expand the AI prompt template</summary>

```
You are helping generate a JSON schema file for a codegen CLI that uses Hygen templates. Follow the instructions precisely and do not add extra explanations or UI formatting. Output a JSON file only in the structure described below.

---

### INPUT

I will provide one of the following:
- A raw SQL `CREATE TABLE` statement
- A natural language description of a data entity and its fields

You will extract the schema and create a JSON object matching the exact structure below. Skip the fields id, created_at, and updated_at as they will be added automatically.

Ensure the entity name is converted to PascalCase (capitalize the first letter of each word, no underscores or spaces). For example, tempuser becomes TempUser, product_order becomes ProductOrder.

Then save the file at the given location and remind me of the correct CLI command to run.

---

### OUTPUT FORMAT

The final output **must be a JSON file**, matching this structure exactly:

{
  "name": "EntityName",
  "isAddTestCase": true,
  "functionalities": ["create", "findAll", "findOne", "update", "delete"],
  "fields": [
    {
      "name": "field_name",
      "type": "int | float | double | decimal | boolean | varchar | text | uuid | timestamp | date | json | custom",
      "optional": true,
      "customType": "CustomTypeName (optional if type is 'custom')",
      "example": "example_value",
      "dto": true
    }
  ]
}

> Notes:
> - `name`: PascalCase (e.g. `User`, `ProductOrder`)
> - `fields[].name`: snake_case
> - `type`: must be one of the allowed values
> - `optional`: true if nullable or optional
> - `example`: valid example for the field
> - `dto`: true if it should be included in DTOs

---

### FILE OUTPUT

Once you've built the correct JSON, **save the file to this path relative to the project root**:

schemas/<entity-name-kebab-case>.json

Example:
schemas/user-profile.json

---

### FINAL INSTRUCTION

Once the file is saved, tell me:

✅ Schema file generated successfully.

Now run:
hexogen resource --schema schemas/<entity-name-kebab-case>.json

---

### NOW GO AHEAD

Here is my input:

[Paste your SQL CREATE TABLE statement or natural language description here]
```

</details>

### Step 3: Execute the Command

Once the AI generates the schema file, run the hexogen command:

```bash
hexogen resource --schema schemas/<entity-name-kebab-case>.json
```

## Example Inputs

### Example 1: SQL CREATE TABLE Statement

**Input:**

```sql
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Expected Output Schema:**

```json
{
  "name": "UserProfile",
  "isAddTestCase": true,
  "functionalities": ["create", "findAll", "findOne", "update", "delete"],
  "fields": [
    {
      "name": "user_id",
      "type": "int",
      "optional": false,
      "customType": "",
      "example": "123",
      "dto": true
    },
    {
      "name": "first_name",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "John",
      "dto": true
    },
    {
      "name": "last_name",
      "type": "varchar",
      "optional": true,
      "customType": "",
      "example": "Doe",
      "dto": true
    },
    {
      "name": "email",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "john.doe@example.com",
      "dto": true
    },
    {
      "name": "phone",
      "type": "varchar",
      "optional": true,
      "customType": "",
      "example": "+1234567890",
      "dto": true
    },
    {
      "name": "date_of_birth",
      "type": "date",
      "optional": true,
      "customType": "",
      "example": "1990-01-01",
      "dto": true
    },
    {
      "name": "is_active",
      "type": "boolean",
      "optional": true,
      "customType": "",
      "example": "true",
      "dto": true
    },
    {
      "name": "preferences",
      "type": "json",
      "optional": true,
      "customType": "",
      "example": "{\"theme\": \"dark\", \"notifications\": true}",
      "dto": false
    }
  ]
}
```

### Example 2: Natural Language Description

**Input:**

```
Create a Product entity with the following fields:
- name (required, varchar)
- description (optional, text)
- price (required, decimal)
- category (required, varchar)
- in_stock (required, boolean)
- tags (optional, json array)
- sku (required, varchar, unique)
```

**Expected Output Schema:**

```json
{
  "name": "Product",
  "isAddTestCase": true,
  "functionalities": ["create", "findAll", "findOne", "update", "delete"],
  "fields": [
    {
      "name": "name",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "iPhone 15 Pro",
      "dto": true
    },
    {
      "name": "description",
      "type": "text",
      "optional": true,
      "customType": "",
      "example": "Latest iPhone with advanced features",
      "dto": true
    },
    {
      "name": "price",
      "type": "decimal",
      "optional": false,
      "customType": "",
      "example": "999.99",
      "dto": true
    },
    {
      "name": "category",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "Electronics",
      "dto": true
    },
    {
      "name": "in_stock",
      "type": "boolean",
      "optional": false,
      "customType": "",
      "example": "true",
      "dto": true
    },
    {
      "name": "tags",
      "type": "json",
      "optional": true,
      "customType": "",
      "example": "[\"smartphone\", \"apple\", \"5g\"]",
      "dto": false
    },
    {
      "name": "sku",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "IPH15PRO-256-BLK",
      "dto": true
    }
  ]
}
```

## Supported Field Types

The following field types are supported in the schema:

| Type        | Description                     | Example                                  |
| ----------- | ------------------------------- | ---------------------------------------- |
| `int`       | Integer values                  | `123`                                    |
| `float`     | Floating point numbers          | `3.14`                                   |
| `double`    | Double precision floating point | `3.14159265359`                          |
| `decimal`   | Decimal numbers (for currency)  | `999.99`                                 |
| `boolean`   | True/false values               | `true`                                   |
| `varchar`   | Variable length strings         | `"Hello World"`                          |
| `text`      | Long text content               | `"Long description..."`                  |
| `uuid`      | UUID/GUID values                | `"550e8400-e29b-41d4-a716-446655440000"` |
| `timestamp` | Date and time                   | `"2023-12-25T10:30:00Z"`                 |
| `date`      | Date only                       | `"2023-12-25"`                           |
| `json`      | JSON objects or arrays          | `{"key": "value"}`                       |
| `custom`    | Custom TypeScript types         | Requires `customType` field              |

## Schema Field Properties

| Property     | Type    | Required | Description                                |
| ------------ | ------- | -------- | ------------------------------------------ |
| `name`       | string  | Yes      | Field name in snake_case                   |
| `type`       | string  | Yes      | One of the supported types above           |
| `optional`   | boolean | Yes      | Whether the field is nullable/optional     |
| `customType` | string  | No       | Custom TypeScript type (for `custom` type) |
| `example`    | string  | Yes      | Example value for Swagger documentation    |
| `dto`        | boolean | Yes      | Whether to include in DTOs                 |

## Tips for Better Schema Generation

### 1. **Use Descriptive Field Names**

- The AI will convert them to appropriate naming conventions
- Be specific about the field purpose

### 2. **Include Constraints**

- Mention if fields are required, unique, or have specific formats
- Specify default values when relevant

### 3. **Provide Meaningful Examples**

- Include realistic sample data
- Help the AI understand the field purpose and format

### 4. **Be Specific About Types**

- Use precise data types for better code generation
- Consider the database and application requirements

### 5. **Consider DTO Inclusion**

- Set `dto: false` for sensitive fields (passwords, tokens)
- Set `dto: false` for computed or internal fields

## Sub-Entity Schema Generation

For sub-entities, use the same prompt but modify the output format to match the sub-entity schema structure:

```json
{
  "parent": "User",
  "name": "Address",
  "fields": [
    {
      "name": "street",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "123 Main St"
    },
    {
      "name": "city",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "New York"
    },
    {
      "name": "postal_code",
      "type": "varchar",
      "optional": false,
      "customType": "",
      "example": "10001"
    }
  ]
}
```

Then run:

```bash
hexogen subentity --schema schemas/address.json
```

## Troubleshooting

### Common Issues

1. **AI generates extra fields**: The prompt specifically asks to skip `id`, `created_at`, and `updated_at`
2. **Wrong naming convention**: Ensure the AI converts to PascalCase for entity names
3. **Invalid field types**: Check that all types match the supported list
4. **Missing examples**: Provide realistic examples for better generation

### Validation

After generation, verify that:

- Entity name is in PascalCase
- Field names are in snake_case
- All field types are supported
- Examples are realistic and match the field type
- DTO inclusion makes sense for each field

## Next Steps

Once you have your schema file:

1. Review the generated schema for accuracy
2. Run the hexogen command to generate your resource
3. Check the generated files and adjust as needed
4. Commit your schema file for future reference
