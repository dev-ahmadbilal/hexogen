const fs = require('fs');
const path = require('path');

module.exports = async (args, prompter) => {
  const schemaFilePath = args.schemaFile || process.env.SCHEMA_FILE;

  // If schema file is provided and exists
  if (schemaFilePath && fs.existsSync(path.resolve(process.cwd(), schemaFilePath))) {
    try {
      const raw = fs.readFileSync(path.resolve(process.cwd(), schemaFilePath), 'utf8');
      const parsed = JSON.parse(raw);

      const result = {
        parent: parsed.parent,
        name: parsed.name,
        fields: Array.isArray(parsed.fields)
          ? parsed.fields.map(field => ({
              name: field.name,
              type: field.type,
              optional: field.optional,
              customType: field.customType,
              example: field.example,
            }))
          : []
      };

      console.log('\n📦 Using entity definition from file:', schemaFilePath);
      return result;
    } catch (err) {
      console.error(`❌ Error processing JSON file: ${err}`);
      process.exit(1);
    }
  }

  // If no valid data file provided, use interactive prompts
  console.log('ℹ️  2 No valid entity definition file found, switching to interactive mode...');
  try {
    return await prompter.prompt([
      {
        type: 'input',
        name: 'parent',
        message: 'What is the parent entity name?',
        validate: (input) => {
          if (!input.trim()) {
            return 'Parent entity name is required. Please provide a valid name.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the sub entity name?',
        validate: (input) => {
          if (!input.trim()) {
            return 'Sub entity name is required. Please provide a valid name.';
          }
          return true;
        },
      },
    ]);
  } catch (err) {
    console.error(`❌ Error during interactive prompts: ${err}`);
    process.exit(1);
  }
};