---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository.ts
---
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from '../../../common/types/pagination-options';
<% } %>
<% if (functionalities.includes('update') || functionalities.includes('create') || functionalities.includes('findOne') || functionalities.includes('findAll') || functionalities.includes('delete')) { %>
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
<% } %>

<% if (functionalities.includes('update')) { %>
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
<% } %>
<% if (functionalities.includes('findOne')) { %>
type NullableType<T> = T | null;
<% } %>

export abstract class <%= name %>AbstractRepository {
  <% if (functionalities.includes('create')) { %>
  abstract create(
    data: Omit<<%= name %>, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<<%= name %>>;
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<<%= name %>[]>;
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  abstract findById(id: <%= name %>['id']): Promise<NullableType<<%= name %>>>;
  <% } %>

  <% if (functionalities.includes('update')) { %>
  abstract update(
    id: <%= name %>['id'],
    payload: DeepPartial<<%= name %>>,
  ): Promise<<%= name %> | null>;
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  abstract remove(id: <%= name %>['id']): Promise<void>;
  <% } %>
}
