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
  
  // Check if we should use custom templates
  const useCustomTemplates = env.USE_CUSTOM_TEMPLATES === 'true';
  const customTemplatesPath = path.join(process.cwd(), 'templates');
  
  // Set environment variables to ensure Hygen uses the correct templates
  const hygenEnv = {
    ...process.env,
    HYGEN_TMPLS: useCustomTemplates ? customTemplatesPath : templatesPath,
    // Override any local .hygen.js configuration
    HYGEN_TMPLS_DIR: useCustomTemplates ? customTemplatesPath : templatesPath,
    // Force Hygen to use our templates
    HYGEN_TMPLS_FORCE: 'true',
    // Add hexogen package directory for script access
    HEXOGEN_PACKAGE_DIR: packageDir,
  };
  
  // Merge with any additional env vars passed in
  Object.assign(hygenEnv, env);
  
  console.log(chalk.gray('[DEBUG] Package dir:', packageDir));
  console.log(chalk.gray('[DEBUG] Templates path:', useCustomTemplates ? customTemplatesPath : templatesPath));
  console.log(chalk.gray('[DEBUG] HYGEN_TMPLS:', hygenEnv.HYGEN_TMPLS));
  console.log(chalk.gray('[DEBUG] Hygen env keys:', Object.keys(hygenEnv).filter(k => k.startsWith('HYGEN'))));
  
  // Create a temporary .hygen.js file in the current directory to override any local config
  const tempHygenConfig = path.join(process.cwd(), '.hygen.js');
  const originalHygenConfig = fs.existsSync(tempHygenConfig) ? fs.readFileSync(tempHygenConfig, 'utf8') : null;
  
  try {
    // Write our own .hygen.js configuration with helpers
    const normalizedHelperPath = helperPath.replace(/\\/g, '/');
    const normalizedTemplatesPath = (useCustomTemplates ? customTemplatesPath : templatesPath).replace(/\\/g, '/');
    
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

function getAllTemplateTypes() {
  const templateTypes = [];
  
  // Check built-in template types in package
  const packageTemplatesDir = path.join(__dirname, '..', 'templates');
  if (fs.existsSync(packageTemplatesDir)) {
    const builtInTypes = fs.readdirSync(packageTemplatesDir).filter((f) => 
      fs.statSync(path.join(packageTemplatesDir, f)).isDirectory()
    );
    templateTypes.push(...builtInTypes);
  }
  
  // Check custom template types in user's project
  const customTemplatesDir = path.join(process.cwd(), 'templates');
  if (fs.existsSync(customTemplatesDir)) {
    const customTypes = fs.readdirSync(customTemplatesDir).filter((f) => 
      fs.statSync(path.join(customTemplatesDir, f)).isDirectory()
    );
    templateTypes.push(...customTypes);
  }
  
  return [...new Set(templateTypes)]; // Remove duplicates
}

function getAvailableGenerators() {
  const generators = [];
  const templateTypes = getAllTemplateTypes();
  
  // Check built-in templates in package
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
  
  // Check custom templates in user's project
  const customTemplatesDir = path.join(process.cwd(), 'templates', 'generate');
  if (fs.existsSync(customTemplatesDir)) {
    const customGenerateTemplates = fs.readdirSync(customTemplatesDir).filter((f) => fs.statSync(path.join(customTemplatesDir, f)).isDirectory());
    generators.push(...customGenerateTemplates.map(template => `custom:${template}`));
  }
  
  // Check custom generate-sub-entity directory
  const customGenerateSubEntityDir = path.join(process.cwd(), 'templates', 'generate-sub-entity');
  if (fs.existsSync(customGenerateSubEntityDir)) {
    const customSubEntityTemplates = fs.readdirSync(customGenerateSubEntityDir).filter((f) => fs.statSync(path.join(customGenerateSubEntityDir, f)).isDirectory());
    generators.push(...customSubEntityTemplates.map(template => `custom:generate-sub-entity/${template}`));
  }
  
  // Check custom generate-version directory
  const customGenerateVersionDir = path.join(process.cwd(), 'templates', 'generate-version');
  if (fs.existsSync(customGenerateVersionDir)) {
    const customVersionTemplates = fs.readdirSync(customGenerateVersionDir).filter((f) => fs.statSync(path.join(customGenerateVersionDir, f)).isDirectory());
    generators.push(...customVersionTemplates.map(template => `custom:generate-version/${template}`));
  }
  
  // Check all other custom template types
  const customTemplatesRoot = path.join(process.cwd(), 'templates');
  if (fs.existsSync(customTemplatesRoot)) {
    const customTypes = fs.readdirSync(customTemplatesRoot).filter((f) => 
      fs.statSync(path.join(customTemplatesRoot, f)).isDirectory() && 
      !['generate', 'generate-sub-entity', 'generate-version', 'property'].includes(f)
    );
    
    for (const type of customTypes) {
      const typeDir = path.join(customTemplatesRoot, type);
      const templates = fs.readdirSync(typeDir).filter((f) => fs.statSync(path.join(typeDir, f)).isDirectory());
      generators.push(...templates.map(template => `custom:${type}/${template}`));
    }
  }
  
  return generators;
}

function getAvailablePropertyTemplates() {
  const properties = [];
  
  // Check built-in property templates
  if (fs.existsSync(propertyDir)) {
    const builtInProperties = fs.readdirSync(propertyDir).filter((f) => fs.statSync(path.join(propertyDir, f)).isDirectory());
    properties.push(...builtInProperties);
  }
  
  // Check custom property templates
  const customPropertyDir = path.join(process.cwd(), 'templates', 'property');
  if (fs.existsSync(customPropertyDir)) {
    const customProperties = fs.readdirSync(customPropertyDir).filter((f) => fs.statSync(path.join(customPropertyDir, f)).isDirectory());
    properties.push(...customProperties.map(template => `custom:${template}`));
  }
  
  return properties;
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
    // Map simplified command names to actual template names
    const commandMappings = {
      'resource': 'relational-resource',
      'subentity': 'generate-sub-entity/relational-resource',
      'versioned': 'generate-version/add-to-relational-resource'
    };
    
    // If it's a simplified command, map it to the actual template
    const actualGenerator = commandMappings[generator] || generator;
    
    const available = getAvailableGenerators();
    if (!available.includes(actualGenerator)) {
      console.log(chalk.red(`Unknown generator: ${generator}`));
      console.log(chalk.yellow('Available generators:'), available.join(', '));
      console.log(chalk.gray('\n💡 You can also use simplified commands:'));
      console.log(chalk.gray('   hexogen resource (instead of hexogen g resource)'));
      console.log(chalk.gray('   hexogen subentity (instead of hexogen g subentity)'));
      console.log(chalk.gray('   hexogen versioned (instead of hexogen g versioned)'));
      process.exit(1);
    }
    
    // Validate schema file if provided
    if (options.schema && !validateSchemaFile(options.schema)) {
      process.exit(1);
    }
    
    // Handle different generator types
    let hygenArgs = [];
    let isCustomTemplate = false;
    
    if (actualGenerator.startsWith('custom:')) {
      isCustomTemplate = true;
      const templateName = actualGenerator.replace('custom:', '');
      
      if (templateName.startsWith('generate-sub-entity/')) {
        console.log(chalk.blue(`Generating custom ${templateName}`));
        hygenArgs = ['generate-sub-entity', templateName.split('/')[1]];
      } else if (templateName.startsWith('generate-version/')) {
        console.log(chalk.blue(`Generating custom ${templateName}`));
        hygenArgs = ['generate-version', templateName.split('/')[1]];
      } else if (templateName.includes('/')) {
        // Handle any other template type with format type/template
        const [type, template] = templateName.split('/');
        console.log(chalk.blue(`Generating custom ${type}/${template}`));
        hygenArgs = [type, template];
      } else {
        console.log(chalk.blue(`Generating custom ${templateName}`));
        hygenArgs = ['generate', templateName];
      }
    } else if (actualGenerator.startsWith('generate-sub-entity/')) {
      console.log(chalk.blue(`Generating ${actualGenerator}`));
      hygenArgs = ['generate-sub-entity', actualGenerator.split('/')[1]];
    } else if (actualGenerator.startsWith('generate-version/')) {
      console.log(chalk.blue(`Generating ${actualGenerator}`));
      hygenArgs = ['generate-version', actualGenerator.split('/')[1]];
    } else {
      console.log(chalk.blue(`Generating ${actualGenerator}`));
      hygenArgs = ['generate', actualGenerator];
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
    
    // Pass custom template flag to runHygen
    env.USE_CUSTOM_TEMPLATES = isCustomTemplate ? 'true' : 'false';
    
    runHygen(hygenArgs, env);
  });

program
  .command('add property')
  .description('Add a property to a module (e.g. hexogen add property)')
  .action(async () => {
    const available = getAvailablePropertyTemplates();
    
    if (available.length === 0) {
      console.log(chalk.red('No property templates found.'));
      process.exit(1);
    }
    
    // If only one template is available, use it automatically
    if (available.length === 1) {
      const template = available[0];
      const isCustom = template.startsWith('custom:');
      const templateName = isCustom ? template.replace('custom:', '') : template;
      
      console.log(chalk.blue(`Using ${isCustom ? 'custom ' : ''}property template: ${templateName}`));
      const hygenArgs = ['property', templateName];
      const env = { USE_CUSTOM_TEMPLATES: isCustom ? 'true' : 'false' };
      runHygen(hygenArgs, env);
      return;
    }
    
    // If multiple templates are available, let user choose
    console.log(chalk.cyan('Available property templates:'));
    available.forEach((template, index) => {
      const isCustom = template.startsWith('custom:');
      const templateName = isCustom ? template.replace('custom:', '') : template;
      console.log(`  ${index + 1}. ${templateName}${isCustom ? ' (custom)' : ''}`);
    });
    
    const selectedTemplate = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Select a template (enter number): ', (answer) => {
        rl.close();
        const index = parseInt(answer.trim()) - 1;
        if (index >= 0 && index < available.length) {
          resolve(available[index]);
        } else {
          console.log(chalk.red('Invalid selection.'));
          process.exit(1);
        }
      });
    });
    
    const isCustom = selectedTemplate.startsWith('custom:');
    const templateName = isCustom ? selectedTemplate.replace('custom:', '') : selectedTemplate;
    
    console.log(chalk.blue(`Using ${isCustom ? 'custom ' : ''}property template: ${templateName}`));
    const hygenArgs = ['property', templateName];
    const env = { USE_CUSTOM_TEMPLATES: isCustom ? 'true' : 'false' };
    runHygen(hygenArgs, env);
  });

program
  .command('list templates')
  .description('List available Hygen templates')
  .action(() => {
    const generators = getAvailableGenerators();
    const properties = getAvailablePropertyTemplates();
    
    console.log(chalk.green('Available generators:'));
    const builtInGenerators = generators.filter(g => !g.startsWith('custom:'));
    const customGenerators = generators.filter(g => g.startsWith('custom:'));
    
    if (builtInGenerators.length > 0) {
      console.log(chalk.cyan('  Built-in:'));
      builtInGenerators.forEach((g) => console.log('    -', g));
    }
    
    if (customGenerators.length > 0) {
      console.log(chalk.cyan('  Custom:'));
      customGenerators.forEach((g) => {
        const templateName = g.replace('custom:', '');
        console.log('    -', templateName);
      });
    }
    
    if (properties.length > 0) {
      console.log(chalk.green('\nAvailable property templates:'));
      const builtInProperties = properties.filter(p => !p.startsWith('custom:'));
      const customProperties = properties.filter(p => p.startsWith('custom:'));
      
      if (builtInProperties.length > 0) {
        console.log(chalk.cyan('  Built-in:'));
        builtInProperties.forEach((p) => console.log('    -', p));
      }
      
      if (customProperties.length > 0) {
        console.log(chalk.cyan('  Custom:'));
        customProperties.forEach((p) => {
          const templateName = p.replace('custom:', '');
          console.log('    -', templateName);
        });
      }
    }
    
    if (generators.length === 0 && properties.length === 0) {
      console.log(chalk.yellow('No templates found.'));
      console.log(chalk.gray('💡 To add custom templates, create a templates/ directory in your project:'));
      console.log(chalk.gray('   templates/'));
      console.log(chalk.gray('   ├── generate/'));
      console.log(chalk.gray('   ├── generate-sub-entity/'));
      console.log(chalk.gray('   ├── generate-version/'));
      console.log(chalk.gray('   └── property/'));
    }
  });

program
  .command('list types')
  .description('List all available template types')
  .action(() => {
    const templateTypes = getAllTemplateTypes();
    
    if (templateTypes.length === 0) {
      console.log(chalk.yellow('No template types found.'));
      return;
    }
    
    console.log(chalk.green('Available template types:'));
    
    // Separate built-in and custom types
    const builtInTypes = ['generate', 'generate-sub-entity', 'generate-version', 'property'];
    const customTypes = templateTypes.filter(type => !builtInTypes.includes(type));
    
    if (builtInTypes.length > 0) {
      console.log(chalk.cyan('  Built-in:'));
      builtInTypes.forEach((type) => {
        if (templateTypes.includes(type)) {
          console.log('    -', type);
        }
      });
    }
    
    if (customTypes.length > 0) {
      console.log(chalk.cyan('  Custom:'));
      customTypes.forEach((type) => console.log('    -', type));
    }
    
    console.log(chalk.gray('\n💡 To create custom template types, add directories to your project\'s templates/ folder'));
  });

program
  .command('help')
  .description('Show help and usage examples')
  .action(() => {
    console.log(chalk.cyan('\nHexogen CLI Usage Examples:'));
    console.log(chalk.green('\nSimplified Commands (Recommended):'));
    console.log('  $ hexogen resource');
    console.log('  $ hexogen resource --schema ./schemas/user.json');
    console.log('  $ hexogen resource --no-prettier');
    console.log('  $ hexogen subentity');
    console.log('  $ hexogen versioned');
    console.log('  $ hexogen add property');
    console.log('  $ hexogen list templates');
    console.log('  $ hexogen list types');
    
    console.log(chalk.green('\nAdvanced Commands (For Power Users):'));
    console.log('  $ hexogen g resource');
    console.log('  $ hexogen g subentity');
    console.log('  $ hexogen g versioned');
    console.log('  $ hexogen g custom:my-generator');
    console.log('  $ hexogen g custom:test/unit-test');
    console.log('  $ hexogen g custom:migration/create-table');
    
    console.log(chalk.green('\nCustom Templates:'));
    console.log('  $ hexogen g custom:query/add-to-relational-resource');
    console.log('  $ hexogen g custom:test/unit-test User');
    console.log('  $ hexogen g custom:migration/create-table users');
    
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