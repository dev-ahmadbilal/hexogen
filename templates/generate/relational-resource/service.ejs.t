---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from '../common/types/pagination-options';
<% } %>
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { <%= name %>AbstractRepository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>Service {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>AbstractRepository) {}

  <% if (functionalities.includes('create')) { %>
  async create(data: Omit<<%= name %>, 'id' | 'createdAt' | 'updatedAt'>): Promise<<%= name %>> {
    return this.<%= h.inflection.camelize(name, true) %>Repository.create(data);
  }
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<<%= name %>[]> {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination({
      paginationOptions,
    });
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  async findById(id: <%= name %>['id']): Promise<<%= name %>> {
    const <%= h.inflection.camelize(name, true) %> = await this.<%= h.inflection.camelize(name, true) %>Repository.findById(id);

    if (!<%= h.inflection.camelize(name, true) %>) {
      throw new NotFoundException(`<%= name %> with ID ${id} not found`);
    }

    return <%= h.inflection.camelize(name, true) %>;
  }
  <% } %>

  <% if (functionalities.includes('update')) { %>
  async update(
    id: <%= name %>['id'],
    data: Partial<<%= name %>>,
  ): Promise<<%= name %>> {
    const <%= h.inflection.camelize(name, true) %> = await this.<%= h.inflection.camelize(name, true) %>Repository.update(id, data);

    if (!<%= h.inflection.camelize(name, true) %>) {
      throw new UnprocessableEntityException(`<%= name %> with ID ${id} not found`);
    }

    return <%= h.inflection.camelize(name, true) %>;
  }
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  remove(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.remove(id);
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // capitalize first letter of the field name
    if (typeof this.<%= h.inflection.camelize(name, true) %>Repository[repoFunction] !== 'function') {
      throw new UnprocessableEntityException(
        `Method ${repoFunction} not found on <%= h.inflection.camelize(name, true) %> repository.`,
        field,
      );
    }

    const <%= h.inflection.camelize(name, true) %> = await this.<%= h.inflection.camelize(name, true) %>Repository[repoFunction](value);
    if (!<%= h.inflection.camelize(name, true) %>) {
      throw new NotFoundException({ [field]: value });
    }
    return <%= h.inflection.camelize(name, true) %>;
  }
  <% } %>
}
