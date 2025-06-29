---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.<%= version%>.ts
---
import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { IPaginationOptions } from '../../common/types/pagination-options';
import { <%= name %><%= version.toUpperCase() %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>';
import { <%= name %>AbstractRepository<%= version.toUpperCase() %> } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository.<%= version%>';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %> {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>: <%= name %>AbstractRepository<%= version.toUpperCase() %>) {}

  <% if (functionalities.includes('create')) { %>
  create(create<%= name %>Dto<%= version.toUpperCase() %>: Create<%= name %>Dto<%= version.toUpperCase() %>) {
    return this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.create(create<%= name %>Dto<%= version.toUpperCase() %>);
  }
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  findOne(id: <%= name %><%= version.toUpperCase() %>['id']) {
    return this.findAndValidate('id', id);
  }
  <% } %>

  <% if (functionalities.includes('update')) { %>
  update(id: <%= name %><%= version.toUpperCase() %>['id'], update<%= name %>Dto<%= version.toUpperCase() %>: Update<%= name %>Dto<%= version.toUpperCase() %>) {
    const <%= h.inflection.camelize(name, true) %> = this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.update(id, update<%= name %>Dto<%= version.toUpperCase() %>);
    if (!<%= h.inflection.camelize(name, true) %>) {
      throw new NotFoundException({ id });
    }
    return <%= h.inflection.camelize(name, true) %>;
  }
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  remove(id: <%= name %><%= version.toUpperCase() %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.remove(id);
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // capitalize first letter of the field name
    if (typeof this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>[repoFunction] !== 'function') {
      throw new UnprocessableEntityException(
        `Method ${repoFunction} not found on <%= h.inflection.camelize(name, true) %> repository.`,
        field,
      );
    }

    const <%= h.inflection.camelize(name, true) %> = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>[repoFunction](value);
    if (!<%= h.inflection.camelize(name, true) %>) {
      throw new NotFoundException({ [field]: value });
    }
    return <%= h.inflection.camelize(name, true) %>;
  }
  <% } %>
}
