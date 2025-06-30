const fs = require('fs');
const path = require('path');

describe('Hexogen Templates', () => {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const generateDir = path.join(templatesDir, 'generate');
  const generateSubEntityDir = path.join(templatesDir, 'generate-sub-entity');
  const generateVersionDir = path.join(templatesDir, 'generate-version');
  const propertyDir = path.join(templatesDir, 'property');

  describe('Template Structure', () => {
    test('should have correct template directories', () => {
      expect(fs.existsSync(templatesDir)).toBe(true);
      expect(fs.existsSync(generateDir)).toBe(true);
      expect(fs.existsSync(generateSubEntityDir)).toBe(true);
      expect(fs.existsSync(generateVersionDir)).toBe(true);
      expect(fs.existsSync(propertyDir)).toBe(true);
    });

    test('should have relational-resource template', () => {
      const relationalResourceDir = path.join(generateDir, 'relational-resource');
      expect(fs.existsSync(relationalResourceDir)).toBe(true);
      
      // Check for essential template files
      expect(fs.existsSync(path.join(relationalResourceDir, 'controller.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'service.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'module.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'service.spec.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(relationalResourceDir, 'prompt.js'))).toBe(true);
    });

    test('should have domain template structure', () => {
      const domainDir = path.join(generateDir, 'relational-resource', 'domain');
      expect(fs.existsSync(domainDir)).toBe(true);
      expect(fs.existsSync(path.join(domainDir, 'domain.ejs.t'))).toBe(true);
    });

    test('should have DTO template structure', () => {
      const dtoDir = path.join(generateDir, 'relational-resource', 'dto');
      expect(fs.existsSync(dtoDir)).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'create.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'find-all.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'update.dto.ejs.t'))).toBe(true);
    });

    test('should have infrastructure template structure', () => {
      const infrastructureDir = path.join(generateDir, 'relational-resource', 'infrastructure');
      expect(fs.existsSync(infrastructureDir)).toBe(true);
      
      const persistenceDir = path.join(infrastructureDir, 'persistence');
      expect(fs.existsSync(persistenceDir)).toBe(true);
      
      const relationalDir = path.join(persistenceDir, 'relational');
      expect(fs.existsSync(relationalDir)).toBe(true);
      
      // Check entities
      const entitiesDir = path.join(relationalDir, 'entities');
      expect(fs.existsSync(entitiesDir)).toBe(true);
      expect(fs.existsSync(path.join(entitiesDir, 'entity.ejs.t'))).toBe(true);
      
      // Check mappers
      const mappersDir = path.join(relationalDir, 'mappers');
      expect(fs.existsSync(mappersDir)).toBe(true);
      expect(fs.existsSync(path.join(mappersDir, 'mapper.ejs.t'))).toBe(true);
      
      // Check repositories
      const repositoriesDir = path.join(relationalDir, 'repositories');
      expect(fs.existsSync(repositoriesDir)).toBe(true);
      expect(fs.existsSync(path.join(repositoriesDir, 'repository.ejs.t'))).toBe(true);
      
      // Check relational persistence module
      expect(fs.existsSync(path.join(relationalDir, 'relational-persistence.module.ejs.t'))).toBe(true);
      
      // Check abstract repository
      expect(fs.existsSync(path.join(persistenceDir, 'abstract.repository.ejs.t'))).toBe(true);
    });

    test('should have app module templates', () => {
      const appModuleDir = path.join(generateDir, 'relational-resource');
      expect(fs.existsSync(path.join(appModuleDir, 'app-module.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(appModuleDir, 'app-module-import.ejs.t'))).toBe(true);
    });

    test('should have mock templates', () => {
      const mockDir = path.join(generateDir, 'relational-resource', '__mock__');
      expect(fs.existsSync(mockDir)).toBe(true);
      expect(fs.existsSync(path.join(mockDir, 'mock.ejs.t'))).toBe(true);
    });
  });

  describe('Sub-Entity Templates', () => {
    test('should have sub-entity template structure', () => {
      const subEntityRelationalDir = path.join(generateSubEntityDir, 'relational-resource');
      expect(fs.existsSync(subEntityRelationalDir)).toBe(true);
      expect(fs.existsSync(path.join(subEntityRelationalDir, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(subEntityRelationalDir, 'prompt.js'))).toBe(true);
    });

    test('should have sub-entity domain template', () => {
      const domainDir = path.join(generateSubEntityDir, 'relational-resource', 'domain');
      expect(fs.existsSync(domainDir)).toBe(true);
      expect(fs.existsSync(path.join(domainDir, 'domain.ejs.t'))).toBe(true);
    });

    test('should have sub-entity infrastructure templates', () => {
      const infrastructureDir = path.join(generateSubEntityDir, 'relational-resource', 'infrastructure');
      expect(fs.existsSync(infrastructureDir)).toBe(true);
      
      const persistenceDir = path.join(infrastructureDir, 'persistence');
      expect(fs.existsSync(persistenceDir)).toBe(true);
      
      const relationalDir = path.join(persistenceDir, 'relational');
      expect(fs.existsSync(relationalDir)).toBe(true);
      
      // Check entities
      const entitiesDir = path.join(relationalDir, 'entities');
      expect(fs.existsSync(entitiesDir)).toBe(true);
      expect(fs.existsSync(path.join(entitiesDir, 'entity.ejs.t'))).toBe(true);
      
      // Check mappers
      const mappersDir = path.join(relationalDir, 'mappers');
      expect(fs.existsSync(mappersDir)).toBe(true);
      expect(fs.existsSync(path.join(mappersDir, 'mapper.ejs.t'))).toBe(true);
      
      // Check repositories
      const repositoriesDir = path.join(relationalDir, 'repositories');
      expect(fs.existsSync(repositoriesDir)).toBe(true);
      expect(fs.existsSync(path.join(repositoriesDir, 'repository-import.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(repositoriesDir, 'repository.injection.ejs.t'))).toBe(true);
      
      // Check relational persistence module
      expect(fs.existsSync(path.join(relationalDir, 'relational-persistence.module-import.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(relationalDir, 'relational-persistence.module-injection.ejs.t'))).toBe(true);
    });
  });

  describe('Version Templates', () => {
    test('should have version template structure', () => {
      const versionDir = path.join(generateVersionDir, 'add-to-relational-resource');
      expect(fs.existsSync(versionDir)).toBe(true);
      expect(fs.existsSync(path.join(versionDir, 'prompt.js'))).toBe(true);
    });

    test('should have version common module templates', () => {
      const commonModuleDir = path.join(generateVersionDir, 'add-to-relational-resource', 'common-module');
      expect(fs.existsSync(commonModuleDir)).toBe(true);
      expect(fs.existsSync(path.join(commonModuleDir, 'module-controller.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(commonModuleDir, 'module-exports.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(commonModuleDir, 'module-imports.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(commonModuleDir, 'module-provider.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(commonModuleDir, 'module-relational.ejs.t'))).toBe(true);
    });

    test('should have version template structure', () => {
      const versionTemplateDir = path.join(generateVersionDir, 'add-to-relational-resource', 'version');
      expect(fs.existsSync(versionTemplateDir)).toBe(true);
      expect(fs.existsSync(path.join(versionTemplateDir, 'controller.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(versionTemplateDir, 'service.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(versionTemplateDir, 'service.spec.ejs.t'))).toBe(true);
    });

    test('should have version domain template', () => {
      const domainDir = path.join(generateVersionDir, 'add-to-relational-resource', 'version', 'domain');
      expect(fs.existsSync(domainDir)).toBe(true);
      expect(fs.existsSync(path.join(domainDir, 'domain.ejs.t'))).toBe(true);
    });

    test('should have version DTO templates', () => {
      const dtoDir = path.join(generateVersionDir, 'add-to-relational-resource', 'version', 'dto');
      expect(fs.existsSync(dtoDir)).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'create.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'find-all.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, 'update.dto.ejs.t'))).toBe(true);
    });

    test('should have version infrastructure templates', () => {
      const infrastructureDir = path.join(generateVersionDir, 'add-to-relational-resource', 'version', 'infrastructure');
      expect(fs.existsSync(infrastructureDir)).toBe(true);
      
      const persistenceDir = path.join(infrastructureDir, 'persistence');
      expect(fs.existsSync(persistenceDir)).toBe(true);
      
      const relationalDir = path.join(persistenceDir, 'relational');
      expect(fs.existsSync(relationalDir)).toBe(true);
      
      // Check entities
      const entitiesDir = path.join(relationalDir, 'entities');
      expect(fs.existsSync(entitiesDir)).toBe(true);
      expect(fs.existsSync(path.join(entitiesDir, 'entity.ejs.t'))).toBe(true);
      
      // Check mappers
      const mappersDir = path.join(relationalDir, 'mappers');
      expect(fs.existsSync(mappersDir)).toBe(true);
      expect(fs.existsSync(path.join(mappersDir, 'mapper.ejs.t'))).toBe(true);
      
      // Check repositories
      const repositoriesDir = path.join(relationalDir, 'repositories');
      expect(fs.existsSync(repositoriesDir)).toBe(true);
      expect(fs.existsSync(path.join(repositoriesDir, 'repository.ejs.t'))).toBe(true);
      
      // Check relational persistence module
      expect(fs.existsSync(path.join(relationalDir, 'relational-persistence.module.ejs.t'))).toBe(true);
      
      // Check abstract repository
      expect(fs.existsSync(path.join(persistenceDir, 'abstract.repository.ejs.t'))).toBe(true);
    });

    test('should have version mock templates', () => {
      const mockDir = path.join(generateVersionDir, 'add-to-relational-resource', 'version', '__mock__');
      expect(fs.existsSync(mockDir)).toBe(true);
      expect(fs.existsSync(path.join(mockDir, 'mock.ejs.t'))).toBe(true);
    });
  });

  describe('Property Templates', () => {
    test('should have property template structure', () => {
      const addToRelationalDir = path.join(propertyDir, 'add-to-relational');
      expect(fs.existsSync(addToRelationalDir)).toBe(true);
      expect(fs.existsSync(path.join(addToRelationalDir, 'index.js'))).toBe(true);
    });

    test('should have property domain template', () => {
      const domainDir = path.join(propertyDir, 'add-to-relational', 'domain');
      expect(fs.existsSync(domainDir)).toBe(true);
      expect(fs.existsSync(path.join(domainDir, 'domain.ejs.t'))).toBe(true);
    });

    test('should have property DTO templates', () => {
      const dtoDir = path.join(propertyDir, 'add-to-relational', 'dto');
      expect(fs.existsSync(dtoDir)).toBe(true);
      
      // Check various DTO templates
      expect(fs.existsSync(path.join(dtoDir, '01-create.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '02-create-import-class-validator.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '03-create-boolean.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '04-create-number.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '05-create-string.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '06-create-import-swagger.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '07-create-api-property.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '08-create-optional-property.dto.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(dtoDir, '09-create-date.dto.ejs.t'))).toBe(true);
    });

    test('should have property infrastructure templates', () => {
      const infrastructureDir = path.join(propertyDir, 'add-to-relational', 'infrastructure');
      expect(fs.existsSync(infrastructureDir)).toBe(true);
      
      const persistenceDir = path.join(infrastructureDir, 'persistence');
      expect(fs.existsSync(persistenceDir)).toBe(true);
      
      const relationalDir = path.join(persistenceDir, 'relational');
      expect(fs.existsSync(relationalDir)).toBe(true);
      
      // Check entities
      const entitiesDir = path.join(relationalDir, 'entities');
      expect(fs.existsSync(entitiesDir)).toBe(true);
      expect(fs.existsSync(path.join(entitiesDir, 'entity.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(entitiesDir, 'entity-column.ejs.t'))).toBe(true);
      
      // Check mappers
      const mappersDir = path.join(relationalDir, 'mappers');
      expect(fs.existsSync(mappersDir)).toBe(true);
      expect(fs.existsSync(path.join(mappersDir, 'mapper-domain.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(mappersDir, 'mapper-persistence.ejs.t'))).toBe(true);
    });

    test('should have property mock templates', () => {
      const mockDir = path.join(propertyDir, 'add-to-relational', '__mock__');
      expect(fs.existsSync(mockDir)).toBe(true);
      expect(fs.existsSync(path.join(mockDir, '01-create-dto-mock.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(mockDir, '02-update-dto-mock.ejs.t'))).toBe(true);
      expect(fs.existsSync(path.join(mockDir, '03-entity-obj-mock.ejs.t'))).toBe(true);
    });
  });

  describe('Template Content Validation', () => {
    test('should have valid EJS template syntax', () => {
      const templateFiles = [];
      
      // Collect all .ejs.t files
      const walkDir = (dir) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            walkDir(filePath);
          } else if (file.endsWith('.ejs.t')) {
            templateFiles.push(filePath);
          }
        }
      };
      
      walkDir(templatesDir);
      
      // Check that we have template files
      expect(templateFiles.length).toBeGreaterThan(0);
      
      // Check a few key templates for basic EJS syntax
      const keyTemplates = [
        path.join(generateDir, 'relational-resource', 'controller.ejs.t'),
        path.join(generateDir, 'relational-resource', 'service.ejs.t'),
        path.join(generateDir, 'relational-resource', 'module.ejs.t')
      ];
      
      keyTemplates.forEach(templatePath => {
        if (fs.existsSync(templatePath)) {
          const content = fs.readFileSync(templatePath, 'utf8');
          expect(content).toContain('<%');
          expect(content).toContain('%>');
        }
      });
    });

    test('should have valid prompt.js files', () => {
      const promptFiles = [
        path.join(generateDir, 'relational-resource', 'prompt.js'),
        path.join(generateSubEntityDir, 'relational-resource', 'prompt.js'),
        path.join(generateVersionDir, 'add-to-relational-resource', 'prompt.js')
      ];
      
      promptFiles.forEach(promptPath => {
        if (fs.existsSync(promptPath)) {
          const content = fs.readFileSync(promptPath, 'utf8');
          expect(content).toContain('module.exports');
        }
      });
    });

    test('should have valid index.js files', () => {
      const indexFiles = [
        path.join(generateDir, 'relational-resource', 'index.js'),
        path.join(generateSubEntityDir, 'relational-resource', 'index.js'),
        path.join(propertyDir, 'add-to-relational', 'index.js')
      ];
      
      indexFiles.forEach(indexPath => {
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, 'utf8');
          expect(content).toContain('module.exports');
        }
      });
    });
  });
}); 