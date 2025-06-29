---
inject: true
to: src/<%= h.inflection.transform(parent, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/relational-persistence.module.ts
after: TypeOrmModule.forFeature
---
    <%= h.inflection.transform(name, ['pluralize']) %>Entity,