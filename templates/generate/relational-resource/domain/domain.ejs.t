---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
import { ApiProperty } from '@nestjs/swagger';

export class <%= name %> {
  @ApiProperty({
    type: String,
  })
  id: string;

  <% if (typeof fields !== 'undefined' && fields.length > 0) { %>
    <% fields.forEach(field => { 
      const tsType = (
        field.type === 'varchar' || field.type === 'text' || field.type === 'uuid' || field.type === 'custom'
          ? 'string'
          : field.type === 'int' || field.type === 'float' || field.type === 'double' || field.type === 'decimal'
          ? 'number'
          : field.type === 'boolean'
          ? 'boolean'
          : field.type === 'timestamp' || field.type === 'date'
          ? 'Date'
          : field.type === 'json'
          ? 'Record<string, any>'
          : 'any'
      );

      const apiType = (
        tsType === 'string' ? 'String' :
        tsType === 'number' ? 'Number' :
        tsType === 'boolean' ? 'Boolean' :
        tsType === 'Date' ? 'Date' :
        tsType === 'Record<string, any>' ? 'Object' : 'any'
      );

      const propertyName = h.inflection.camelize(field.name, true);

      let exampleValue = field.example;
      if (field.type === 'json') {
        try {
          exampleValue = JSON.parse(field.example);
        } catch {}
      }
    %>
    @ApiProperty({
      type: <%= apiType %>,
      example: <%- JSON.stringify(exampleValue, null, 2) %>,
      required: <%= !field.optional %>,
    })
    <%= propertyName %><%= field.optional ? '?' : '' %>: <%- tsType %>;
    <% }) %>
  <% } %>
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}