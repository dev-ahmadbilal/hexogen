const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('Hexogen CLI', () => {
  const testDir = path.join(__dirname, '..', 'test-output');
  const cliPath = path.join(__dirname, '..', 'bin', 'hexogen.js');
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
    const filesToClean = ['test-schema.json', 'invalid-schema.json', '.hygen.js'];
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

  describe('Help and Version', () => {
    test('should show version information', () => {
      const output = execSync(`node ${cliPath} --version`, { encoding: 'utf8' });
      expect(output).toContain('1.0.0');
    });

    test('should show help with --help flag', () => {
      const output = execSync(`node ${cliPath} --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen');
      expect(output).toContain('Commands:');
      expect(output).toContain('A CLI tool for generating hexagonal architecture modules');
    });

    test('should show help with help command', () => {
      const output = execSync(`node ${cliPath} help`, { encoding: 'utf8' });
      expect(output).toContain('Hexogen CLI Usage Examples:');
      expect(output).toContain('$ hexogen resource User');
      expect(output).toContain('$ hexogen subentity SubItem');
      expect(output).toContain('$ hexogen versioned User');
      expect(output).toContain('$ hexogen property');
    });

    test('should show help for resource command', () => {
      const output = execSync(`node ${cliPath} resource --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen resource');
      expect(output).toContain('Generate a main resource');
      expect(output).toContain('--schema');
      expect(output).toContain('--no-prettier');
    });

    test('should show help for subentity command', () => {
      const output = execSync(`node ${cliPath} subentity --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen subentity');
      expect(output).toContain('Generate a sub-entity');
    });

    test('should show help for versioned command', () => {
      const output = execSync(`node ${cliPath} versioned --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen versioned');
      expect(output).toContain('Generate a versioned resource');
    });

    test('should show help for property command', () => {
      const output = execSync(`node ${cliPath} property --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen property');
      expect(output).toContain('Add a property to a module');
    });

    test('should show help for list templates command', () => {
      const output = execSync(`node ${cliPath} list templates --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen list [options] <templates>');
      expect(output).toContain('List available Hygen templates');
    });

    test('should show help when no arguments provided', () => {
      const output = execSync(`node ${cliPath}`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen');
      expect(output).toContain('Commands:');
    });
  });

  describe('Template Listing', () => {
    test('should list available templates with user-friendly names', () => {
      const output = execSync(`node ${cliPath} list templates`, { encoding: 'utf8' });
      expect(output).toContain('Available templates:');
      expect(output).toContain('- resource');
      expect(output).toContain('- subentity');
      expect(output).toContain('- versioned');
      expect(output).toContain('- property');
    });
  });

  describe('Schema Validation', () => {
    test('should validate schema file exists', () => {
      expect(() => {
        execSync(`node ${cliPath} resource TestResource --schema non-existent.json`, { stdio: 'pipe' });
      }).toThrow();
    });

    test('should validate schema file is valid JSON', () => {
      fs.writeFileSync('invalid-schema.json', '{ invalid json }');
      expect(() => {
        execSync(`node ${cliPath} resource TestResource --schema invalid-schema.json`, { stdio: 'pipe' });
      }).toThrow();
    });
  });

  describe('Property Addition', () => {
    test('should show help for property command', () => {
      const output = execSync(`node ${cliPath} property --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage: hexogen property');
      expect(output).toContain('Add a property to a module');
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

  describe('Error Handling', () => {
    test('should handle invalid command arguments', () => {
      expect(() => {
        execSync(`node ${cliPath} resource --invalid-flag`, { stdio: 'pipe' });
      }).toThrow();
    });
  });
});
