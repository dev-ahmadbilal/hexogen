---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
---
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@Entity({
  name: '<%= h.inflection.transform(name, ['underscore']) %>',
})
export class <%= name %>Entity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  <% if(typeof fields !== 'undefined' && fields.length > 0) { %>
  <% fields.forEach(field => {
    const propertyName = h.inflection.underscore(field.name, true);
    const columnName = h.inflection.underscore(field.name);
    // Map your types for TypeORM
    let columnType = '';
    let useTransformer = false;

    if (field.type === 'varchar' || field.type === 'text' || field.type === 'uuid') {
      columnType = 'varchar';
    } else if (field.type === 'int') {
      columnType = 'int';
    } else if (field.type === 'float' || field.type === 'double') {
      columnType = 'float';
    } else if (field.type === 'decimal') {
      columnType = 'decimal';
    } else if (field.type === 'boolean') {
      columnType = 'boolean';
    } else if (field.type === 'timestamp') {
      columnType = 'timestamp';
    } else if (field.type === 'date') {
      columnType = 'date';
    } else if (field.type === 'json') {
      columnType = 'jsonb';
    } else if (field.type === 'custom') {
      columnType = field.customType;
    } else {
      columnType = 'varchar'; // fallback
    }
  %>
  @Column({
    name: '<%= columnName %>',
    type: '<%= columnType %>',
    nullable: <%= field.optional %>, 
  })
  <%= propertyName %><%= field.optional ? '?' : '' %>: <%- field.type === 'int' || field.type === 'float' || field.type === 'double' || field.type === 'decimal' ? 'number' : field.type === 'boolean' ? 'boolean' : field.type === 'json' ? 'Record<string, any>' : 'string' %>;
  <% }) %>
  <% } %>
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
