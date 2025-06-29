#!/usr/bin/env node

const { Command } = require('commander');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const readline = require('readline');

const program = new Command();
const templatesDir = path.join(__dirname, '..', 'templates', 'generate');
const propertyDir = path.join(__dirname, '..', 'templates', 'property');

function copyCommonFiles() {
  console.log(chalk.blue(`📁 Checking for common utilities...`));
  
  const packageDir = path.join(__dirname, '..');
  const commonSourceDir = path.join(packageDir, 'common');
  const targetCommonDir = path.join(process.cwd(), 'src', 'common');
  
  // Check if common files exist in the package
  if (!fs.existsSync(commonSourceDir)) {
    console.log(chalk.yellow(`⚠️  Common files not found in package, skipping`));
    return;
  }
  
  // Check if any generated files need pagination utilities
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.log(chalk.gray(`⏭️  No src directory found, skipping common utilities`));
    return;
  }
  
  // Look for files that import pagination utilities
  let needsPagination = false;
  try {
    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.ts') && !file.includes('node_modules')) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('IPaginationOptions') || content.includes('pagination-options')) {
            needsPagination = true;
            return; // Found one, no need to continue
          }
        }
      }
    };
    
    walkDir(srcDir);
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Error checking for pagination imports: ${error.message}`));
  }
  
  if (!needsPagination) {
    console.log(chalk.gray(`⏭️  No pagination utilities needed, skipping`));
    return;
  }
  
  try {
    // Create target directories if they don't exist
    const targetTypesDir = path.join(targetCommonDir, 'types');
    const targetDtoDir = path.join(targetCommonDir, 'dto');
    
    if (!fs.existsSync(targetTypesDir)) {
      fs.mkdirSync(targetTypesDir, { recursive: true });
    }
    if (!fs.existsSync(targetDtoDir)) {
      fs.mkdirSync(targetDtoDir, { recursive: true });
    }
    
    let filesCopied = 0;
    
    // Copy pagination-options.ts
    const paginationOptionsSource = path.join(commonSourceDir, 'pagination-options.ts');
    const paginationOptionsTarget = path.join(targetTypesDir, 'pagination-options.ts');
    if (fs.existsSync(paginationOptionsSource) && !fs.existsSync(paginationOptionsTarget)) {
      fs.copyFileSync(paginationOptionsSource, paginationOptionsTarget);
      console.log(chalk.green(`  ✓ Copied pagination-options.ts`));
      filesCopied++;
    } else if (fs.existsSync(paginationOptionsTarget)) {
      console.log(chalk.gray(`  ⏭️  pagination-options.ts already exists`));
    }
    
    // Copy pagination-response.dto.ts
    const paginationResponseSource = path.join(commonSourceDir, 'pagination-response.dto.ts');
    const paginationResponseTarget = path.join(targetDtoDir, 'pagination-response.dto.ts');
    if (fs.existsSync(paginationResponseSource) && !fs.existsSync(paginationResponseTarget)) {
      fs.copyFileSync(paginationResponseSource, paginationResponseTarget);
      console.log(chalk.green(`  ✓ Copied pagination-response.dto.ts`));
      filesCopied++;
    } else if (fs.existsSync(paginationResponseTarget)) {
      console.log(chalk.gray(`  ⏭️  pagination-response.dto.ts already exists`));
    }
    
    // Copy infinity-pagination-response.dto.ts
    const infinityPaginationResponseSource = path.join(commonSourceDir, 'infinity-pagination-response.dto.ts');
    const infinityPaginationResponseTarget = path.join(targetDtoDir, 'infinity-pagination-response.dto.ts');
    if (fs.existsSync(infinityPaginationResponseSource) && !fs.existsSync(infinityPaginationResponseTarget)) {
      fs.copyFileSync(infinityPaginationResponseSource, infinityPaginationResponseTarget);
      console.log(chalk.green(`  ✓ Copied infinity-pagination-response.dto.ts`));
      filesCopied++;
    } else if (fs.existsSync(infinityPaginationResponseTarget)) {
      console.log(chalk.gray(`  ⏭️  infinity-pagination-response.dto.ts already exists`));
    }
    
    // Copy infinity-pagination.ts
    const infinityPaginationSource = path.join(commonSourceDir, 'infinity-pagination.ts');
    const infinityPaginationTarget = path.join(targetCommonDir, 'infinity-pagination.ts');
    if (fs.existsSync(infinityPaginationSource) && !fs.existsSync(infinityPaginationTarget)) {
      fs.copyFileSync(infinityPaginationSource, infinityPaginationTarget);
      console.log(chalk.green(`  ✓ Copied infinity-pagination.ts`));
      filesCopied++;
    } else if (fs.existsSync(infinityPaginationTarget)) {
      console.log(chalk.gray(`  ⏭️  infinity-pagination.ts already exists`));
    }
    
    if (filesCopied > 0) {
      console.log(chalk.green(`✨ Common utilities copied successfully (${filesCopied} files)`));
    } else {
      console.log(chalk.gray(`✨ All common utilities already exist`));
    }
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Failed to copy common files: ${error.message}`));
    console.log(chalk.gray(`   This is not critical, you can copy them manually if needed`));
  }
}

function runPrettier(targetDir = 'src/') {
  console.log(chalk.blue(`🧼 Running Prettier...`));
  
  // Check if the target directory exists before running prettier
  const fullTargetPath = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(fullTargetPath)) {
    console.log(chalk.yellow(`⚠️  Target directory ${targetDir} not found, skipping Prettier`));
    return;
  }
  
  const prettierProcess = spawn('npx', ['prettier', '--write', targetDir], {
    stdio: 'pipe',
    cwd: process.cwd(),
  });

  // Set a timeout to prevent hanging
  const timeout = setTimeout(() => {
    prettierProcess.kill('SIGTERM');
    console.log(chalk.yellow('⚠️  Prettier timed out after 30 seconds (this is not critical)'));
  }, 30000);

  prettierProcess.on('close', (code) => {
    clearTimeout(timeout);
    if (code === 0) {
      console.log(chalk.green('✨ Prettier formatting completed'));
    } else if (code === 1) {
      // Prettier not found or failed
      console.log(chalk.yellow('⚠️  Prettier not found in this project'));
      console.log(chalk.gray('💡 To install Prettier: npm install --save-dev prettier'));
      console.log(chalk.gray('💡 Or use --no-prettier flag to skip formatting'));
    } else {
      console.log(chalk.yellow(`⚠️  Prettier formatting failed with code ${code} (this is not critical)`));
    }
  });

  prettierProcess.on('error', (err) => {
    clearTimeout(timeout);
    if (err.code === 'ENOENT') {
      console.log(chalk.yellow('⚠️  Prettier not found in this project'));
      console.log(chalk.gray('💡 To install Prettier: npm install --save-dev prettier'));
      console.log(chalk.gray('💡 Or use --no-prettier flag to skip formatting'));
    } else {
      console.log(chalk.yellow('⚠️  Prettier failed to run (this is not critical)'));
      console.log(chalk.gray(`   Error: ${err.message}`));
    }
  });
}

function validateSchemaFile(schemaPath) {
  if (!schemaPath) return true;
  
  const fullPath = path.resolve(process.cwd(), schemaPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(chalk.red(`❌ Schema file not found: ${schemaPath}`));
    return false;
  }
  
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(content); // Validate JSON
    console.log(chalk.green(`✅ Loaded schema from ${schemaPath}`));
    return true;
  } catch (error) {
    console.log(chalk.red(`❌ Invalid JSON in schema file: ${schemaPath}`));
    console.log(chalk.red(`   Error: ${error.message}`));
    return false;
  }
}

function runHygen(args, env = {}) {
  console.log(chalk.gray('[DEBUG] Hygen args:', JSON.stringify(args)));
  
  // Get the package directory (where hexogen is installed)
  const packageDir = path.join(__dirname, '..');
  const templatesPath = path.join(packageDir, 'templates');
  const helperPath = path.join(packageDir, 'hygen-helper.js');
  
  // Set environment variables to ensure Hygen uses our templates
  const hygenEnv = {
    ...process.env,
    HYGEN_TMPLS: templatesPath,
    // Override any local .hygen.js configuration
    HYGEN_TMPLS_DIR: templatesPath,
    // Force Hygen to use our templates
    HYGEN_TMPLS_FORCE: 'true',
    // Add hexogen package directory for script access
    HEXOGEN_PACKAGE_DIR: packageDir,
  };
  
  // Merge with any additional env vars passed in
  Object.assign(hygenEnv, env);
  
  console.log(chalk.gray('[DEBUG] Package dir:', packageDir));
  console.log(chalk.gray('[DEBUG] Templates path:', templatesPath));
  console.log(chalk.gray('[DEBUG] HYGEN_TMPLS:', hygenEnv.HYGEN_TMPLS));
  console.log(chalk.gray('[DEBUG] Hygen env keys:', Object.keys(hygenEnv).filter(k => k.startsWith('HYGEN'))));
  
  // Create a temporary .hygen.js file in the current directory to override any local config
  const tempHygenConfig = path.join(process.cwd(), '.hygen.js');
  const originalHygenConfig = fs.existsSync(tempHygenConfig) ? fs.readFileSync(tempHygenConfig, 'utf8') : null;
  
  try {
    // Write our own .hygen.js configuration with helpers
    const normalizedHelperPath = helperPath.replace(/\\/g, '/');
    const normalizedTemplatesPath = templatesPath.replace(/\\/g, '/');
    
    fs.writeFileSync(tempHygenConfig, `const helpers = require('${normalizedHelperPath}');
module.exports = {
  helpers,
  templates: '${normalizedTemplatesPath}'
};`);
  
  const hygenProcess = spawn('npx', ['hygen', ...args], {
    stdio: 'inherit',
      env: hygenEnv,
      // Set cwd to the current working directory (where the user is running the command)
      cwd: process.cwd(),
  });
  
  hygenProcess.on('close', (code) => {
      // Restore original .hygen.js if it existed
      if (originalHygenConfig) {
        fs.writeFileSync(tempHygenConfig, originalHygenConfig);
      } else {
        fs.unlinkSync(tempHygenConfig);
      }
      
    if (code === 0) {
      console.log(chalk.green('✔ Success!'));
        
        // Copy common files after successful generation
        copyCommonFiles();
        
        // Run Prettier after successful Hygen execution (unless disabled)
        if (env.SKIP_PRETTIER !== 'true') {
          // Determine the specific generated directory
          let targetDir = 'src/';
          if (args.length > 2 && args[1] === 'generate') {
            // Extract the name from args and convert to folder name
            const name = args[3];
            if (name) {
              // Convert to lowercase and pluralize for the folder name
              const folderName = name.toLowerCase() + 's';
              targetDir = `src/${folderName}/`;
            }
          }
      runPrettier(targetDir);
        } else {
          console.log(chalk.gray('⏭️  Skipping Prettier formatting'));
        }
    } else {
      console.log(chalk.red('✖ Hygen failed with code ' + code));
    }
  });
  
  hygenProcess.on('error', (err) => {
      // Restore original .hygen.js if it existed
      if (originalHygenConfig) {
        fs.writeFileSync(tempHygenConfig, originalHygenConfig);
      } else {
        fs.unlinkSync(tempHygenConfig);
      }
      
    console.error(chalk.red('Failed to start hygen process:'), err);
    process.exit(1);
  });
  } catch (error) {
    console.error(chalk.red('Failed to create temporary hygen config:'), error);
    process.exit(1);
  }
}

function getAvailableGenerators() {
  const generators = [];
  
  // Check generate directory
  if (fs.existsSync(templatesDir)) {
    const generateTemplates = fs.readdirSync(templatesDir).filter((f) => fs.statSync(path.join(templatesDir, f)).isDirectory());
    generators.push(...generateTemplates);
  }
  
  // Check generate-sub-entity directory
  const generateSubEntityDir = path.join(__dirname, '..', 'templates', 'generate-sub-entity');
  if (fs.existsSync(generateSubEntityDir)) {
    const subEntityTemplates = fs.readdirSync(generateSubEntityDir).filter((f) => fs.statSync(path.join(generateSubEntityDir, f)).isDirectory());
    generators.push(...subEntityTemplates.map(template => `generate-sub-entity/${template}`));
  }
  
  // Check generate-version directory
  const generateVersionDir = path.join(__dirname, '..', 'templates', 'generate-version');
  if (fs.existsSync(generateVersionDir)) {
    const versionTemplates = fs.readdirSync(generateVersionDir).filter((f) => fs.statSync(path.join(generateVersionDir, f)).isDirectory());
    generators.push(...versionTemplates.map(template => `generate-version/${template}`));
  }
  
  // Check seeds directory
  const seedsDir = path.join(__dirname, '..', 'templates', 'seeds');
  if (fs.existsSync(seedsDir)) {
    const seedsTemplates = fs.readdirSync(seedsDir).filter((f) => fs.statSync(path.join(seedsDir, f)).isDirectory());
    generators.push(...seedsTemplates.map(template => `seeds/${template}`));
  }
  
  // Check query directory
  const queryDir = path.join(__dirname, '..', 'templates', 'query');
  if (fs.existsSync(queryDir)) {
    const queryTemplates = fs.readdirSync(queryDir).filter((f) => fs.statSync(path.join(queryDir, f)).isDirectory());
    generators.push(...queryTemplates.map(template => `query/${template}`));
  }
  
  return generators;
}

function getAvailablePropertyTemplates() {
  if (!fs.existsSync(propertyDir)) return [];
  return fs.readdirSync(propertyDir).filter((f) => fs.statSync(path.join(propertyDir, f)).isDirectory());
}

program
  .name('hexogen')
  .description('A CLI tool for generating hexagonal architecture modules in NestJS applications')
  .version('1.0.0');

program
  .command('g <generator>')
  .alias('generate')
  .description('Generate a new module/resource (e.g. hexogen g relational-resource)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/user.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action((generator, options) => {
    const available = getAvailableGenerators();
    if (!available.includes(generator)) {
      console.log(chalk.red(`Unknown generator: ${generator}`));
      console.log(chalk.yellow('Available generators:'), available.join(', '));
      process.exit(1);
    }
    
    // Validate schema file if provided
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    
    // Handle different generator types
    let hygenArgs = [];
    
    if (generator.startsWith('generate-sub-entity/')) {
      console.log(chalk.blue(`Generating ${generator}`));
      hygenArgs = ['generate-sub-entity', generator.split('/')[1]];
    } else if (generator.startsWith('generate-version/')) {
      console.log(chalk.blue(`Generating ${generator}`));
      hygenArgs = ['generate-version', generator.split('/')[1]];
    } else if (generator.startsWith('seeds/')) {
      console.log(chalk.blue(`Generating ${generator}`));
      hygenArgs = ['seeds', generator.split('/')[1]];
    } else if (generator.startsWith('query/')) {
      console.log(chalk.blue(`Generating ${generator}`));
      hygenArgs = ['query', generator.split('/')[1]];
    } else {
      console.log(chalk.blue(`Generating ${generator}`));
      hygenArgs = ['generate', generator];
    }
    
    // Set environment variable for schema file instead of passing as argument
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    
    // Pass prettier option to runHygen
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    
    runHygen(hygenArgs, env);
  });

program
  .command('add property')
  .description('Add a property to a module (e.g. hexogen add property)')
  .action(() => {
    const available = getAvailablePropertyTemplates();
    if (!available.includes('add-to-relational')) {
      console.log(chalk.red('Property template "add-to-relational" not found.'));
      process.exit(1);
    }
    console.log(chalk.blue(`Adding property to module`));
    runHygen(['property', 'add-to-relational']);
  });

program
  .command('list templates')
  .description('List available Hygen templates')
  .action(() => {
    const generators = getAvailableGenerators();
    const properties = getAvailablePropertyTemplates();
    console.log(chalk.green('Available generators:'));
    generators.forEach((g) => console.log('  -', g));
    if (properties.length) {
      console.log(chalk.green('\nAvailable property templates:'));
      properties.forEach((p) => console.log('  -', p));
    }
  });

program
  .command('help')
  .description('Show help and usage examples')
  .action(() => {
    console.log(chalk.cyan('\nHexogen CLI Usage Examples:'));
    console.log('  $ hexogen resource');
    console.log('  $ hexogen resource --schema ./schemas/user.json');
    console.log('  $ hexogen resource --no-prettier');
    console.log('  $ hexogen subentity');
    console.log('  $ hexogen versioned');
    console.log('  $ hexogen seed');
    console.log('  $ hexogen query');
    console.log('  $ hexogen add property');
    console.log('  $ hexogen list templates');
    console.log('  $ hexogen help');
    program.help();
  });

program
  .command('subentity [name]')
  .description('Generate a sub-entity (e.g. hexogen subentity SubItem)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/subitem.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action(async (name, options) => {
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    let entityName = name;
    if (!options.schema && !entityName) {
      // Prompt for sub-entity name
      entityName = await new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the sub-entity name: ', (answer) => {
          rl.close();
          resolve(answer.trim());
        });
      });
      if (!entityName) {
        console.log(chalk.red('Sub-entity name is required.'));
        process.exit(1);
      }
    }
    console.log(chalk.blue(`Generating sub-entity with name: ${entityName}`));
    const hygenArgs = ['generate-sub-entity', 'relational-resource', '--name', entityName];
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    runHygen(hygenArgs, env);
  });

program
  .command('resource [name]')
  .description('Generate a main resource (e.g. hexogen resource User)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/user.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action(async (name, options) => {
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    let entityName = name;
    if (!options.schema && !entityName) {
      // Prompt for entity name
      entityName = await new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the entity name: ', (answer) => {
          rl.close();
          resolve(answer.trim());
        });
      });
      if (!entityName) {
        console.log(chalk.red('Entity name is required.'));
        process.exit(1);
      }
    }
    console.log(chalk.blue(`Generating main resource with name: ${entityName}`));
    const hygenArgs = ['generate', 'relational-resource', '--name', entityName];
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    runHygen(hygenArgs, env);
  });

program
  .command('versioned')
  .description('Generate a versioned resource (e.g. hexogen versioned)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/user.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action((options) => {
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    console.log(chalk.blue(`Generating versioned resource`));
    const hygenArgs = ['generate-version', 'add-to-relational-resource'];
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    runHygen(hygenArgs, env);
  });

program
  .command('seed')
  .description('Generate a seed module (e.g. hexogen seed)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/user.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action((options) => {
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    console.log(chalk.blue(`Generating seed module`));
    const hygenArgs = ['seeds', 'create-relational'];
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    runHygen(hygenArgs, env);
  });

program
  .command('query')
  .description('Generate a query module (e.g. hexogen query)')
  .option('-s, --schema <path>', 'Path to schema JSON file (e.g. --schema ./schemas/user.json)')
  .option('--no-prettier', 'Skip Prettier formatting after generation')
  .action((options) => {
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    console.log(chalk.blue(`Generating query module`));
    const hygenArgs = ['query', 'add-to-relational-resource'];
    const env = {};
    if (options.schema) {
      const fullSchemaPath = path.resolve(process.cwd(), options.schema);
      env.SCHEMA_FILE = fullSchemaPath;
      hygenArgs.push('--schema', fullSchemaPath);
    }
    env.SKIP_PRETTIER = options.prettier === false ? 'true' : 'false';
    runHygen(hygenArgs, env);
  });

// Fallback for unknown commands
program.on('command:*', (operands) => {
  console.log(chalk.red(`Unknown command: ${operands.join(' ')}`));
  program.help();
});

// Show help if no args
if (process.argv.length <= 2) {
  program.help();
}

program.parse(process.argv); 