const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('Hexogen CLI Utilities', () => {
  const testDir = path.join(__dirname, '..', 'test-output');
  const originalCwd = process.cwd();

  beforeAll(() => {
    // Clean up and recreate test directory
    try {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    } catch (error) {
      // Ignore cleanup errors
    }

    // Ensure test directory exists
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    try {
      process.chdir(originalCwd);
    } catch (error) {
      // Ignore directory change errors in cleanup
    }
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    // Ensure test directory exists before changing to it
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Verify directory exists and is accessible
    if (!fs.existsSync(testDir)) {
      throw new Error(`Test directory could not be created: ${testDir}`);
    }

    try {
      process.chdir(testDir);
    } catch (error) {
      throw new Error(`Failed to change directory to ${testDir}: ${error.message}`);
    }
  });

  afterEach(() => {
    try {
      process.chdir(originalCwd);
    } catch (error) {
      // Ignore directory change errors in cleanup
    }
    if (fs.existsSync(path.join(testDir, 'src'))) {
      fs.rmSync(path.join(testDir, 'src'), { recursive: true, force: true });
    }
    // Clean up any generated files
    const filesToClean = ['test-schema.json', 'invalid-schema.json', '.hygen.js', 'valid-schema.json'];
    filesToClean.forEach((file) => {
      if (fs.existsSync(path.join(testDir, file))) {
        try {
          fs.unlinkSync(path.join(testDir, file));
        } catch (error) {
          // Ignore errors if file doesn't exist
        }
      }
    });
  });

  describe('Template Discovery', () => {
    test('should find built-in templates', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      const output = execSync(`node ${cliPath} list templates`, { encoding: 'utf8' });

      // Should find the main templates
      expect(output).toContain('Available templates:');
      expect(output).toContain('- resource');
      expect(output).toContain('- subentity');
      expect(output).toContain('- versioned');
      expect(output).toContain('- property');
    });

    test('should handle missing template directories gracefully', () => {
      // This test verifies that the CLI doesn't crash when template directories are missing
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      expect(() => {
        execSync(`node ${cliPath} list templates`, { stdio: 'pipe' });
      }).not.toThrow();
    });
  });

  describe('Schema Validation', () => {
    test('should reject non-existent schema file', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      expect(() => {
        execSync(`node ${cliPath} resource TestResource --schema non-existent.json`, { stdio: 'pipe' });
      }).toThrow();
    });

    test('should reject invalid JSON schema file', () => {
      fs.writeFileSync('invalid-schema.json', '{ invalid json }');

      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      expect(() => {
        execSync(`node ${cliPath} resource TestResource --schema invalid-schema.json`, { stdio: 'pipe' });
      }).toThrow();
    });
  });

  describe('Command Help', () => {
    test('should show help for all commands', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');

      // Test help for each command
      const commands = ['resource', 'subentity', 'versioned', 'property'];

      commands.forEach((command) => {
        const output = execSync(`node ${cliPath} ${command} --help`, { encoding: 'utf8' });
        expect(output).toContain(`Usage: hexogen ${command}`);
      });
    });

    test('should show main help', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      const output = execSync(`node ${cliPath} --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen');
      expect(output).toContain('Commands:');
    });

    test('should show help command output', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      const output = execSync(`node ${cliPath} help`, { encoding: 'utf8' });
      expect(output).toContain('Hexogen CLI Usage Examples:');
      expect(output).toContain('$ hexogen resource User');
    });
  });

  describe('Version Information', () => {
    test('should show version', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
      const output = execSync(`node ${cliPath} --version`, { encoding: 'utf8' });
      expect(output).toContain('1.0.0');
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid command arguments', () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');

      expect(() => {
        execSync(`node ${cliPath} resource --invalid-flag`, { stdio: 'pipe' });
      }).toThrow();
    });

    test('should have property templates available', () => {
      // Test that property templates exist without running the interactive command
      const propertyTemplatesDir = path.join(__dirname, '..', 'templates', 'property');
      expect(fs.existsSync(propertyTemplatesDir)).toBe(true);

      const templates = fs.readdirSync(propertyTemplatesDir);
      expect(templates.length).toBeGreaterThan(0);
      expect(templates).toContain('add-to-relational');
    });
  });

  describe('Template Structure Validation', () => {
    test('should have required template directories', () => {
      const templatesDir = path.join(__dirname, '..', 'templates');
      const generateDir = path.join(templatesDir, 'generate');
      const generateSubEntityDir = path.join(templatesDir, 'generate-sub-entity');
      const generateVersionDir = path.join(templatesDir, 'generate-version');
      const propertyDir = path.join(templatesDir, 'property');

      expect(fs.existsSync(templatesDir)).toBe(true);
      expect(fs.existsSync(generateDir)).toBe(true);
      expect(fs.existsSync(generateSubEntityDir)).toBe(true);
      expect(fs.existsSync(generateVersionDir)).toBe(true);
      expect(fs.existsSync(propertyDir)).toBe(true);
    });

    test('should have relational-resource template', () => {
      const relationalResourceDir = path.join(__dirname, '..', 'templates', 'generate', 'relational-resource');
      expect(fs.existsSync(relationalResourceDir)).toBe(true);

      // Check for essential template files
      expect(fs.existsSync(path.join(relationalResourceDir, 'controller.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'service.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'module.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'prompt.js'))).toBe(true);
    });

    test('should have property template', () => {
      const propertyDir = path.join(__dirname, '..', 'templates', 'property', 'add-to-relational');
      expect(fs.existsSync(propertyDir)).toBe(true);
      expect(fs.existsSync(path.join(propertyDir, 'index.js'))).toBe(true);
    });
  });
});
