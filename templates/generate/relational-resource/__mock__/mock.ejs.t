---
to: "<%= isAddTestCase ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/__mock__/${h.inflection.transform(name, ['underscore', 'dasherize'])}.mock.ts` : null %>"
---
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from '../../common/types/pagination-options';
<% } %>
<% if (functionalities.includes('create')) { %>
import { Create<%= name %>Dto } from '../dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
<% } %>
<% if (functionalities.includes('update')) { %>
import { Update<%= name %>Dto } from '../dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
<% } %>
import { <%= name %> } from '../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
// __mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.ts
<% if (functionalities.includes('findAll')) { %>
export const paginationOptions: IPaginationOptions = {
    page: 1,
    limit: 10,
};
<% } %>
<% if (functionalities.includes('create')) { %>
export const mockCreate<%= name %>Dto: Create<%= name %>Dto = {
    // provide necessary fields here @create-dto
    <% if (typeof fields !== 'undefined' && fields.length > 0) { %>
        <% fields
            .filter(field => field.includeInDTO && !field.optional)
            .forEach(field => { %>
            <%= h.inflection.camelize(field.name, true) %>:
            <% if (['varchar', 'text', 'uuid', 'custom', 'date', 'datetime', 'time', 'timestamp', 'json', 'enum'].includes(field.type)) { %>
                '<%= field.example %>',
            <% } else if (['int', 'float', 'double', 'decimal'].includes(field.type)) { %>
                <%= field.example %>,
            <% } else if (field.type === 'boolean') { %>
                <%= field.example === 'true' || field.example === true ? 'true' : 'false' %>,
            <% } else { %>
                <%= JSON.stringify(field.example) %>,
            <% } %>
        <% }); %>
    <% } %>
};
<% } %>
<% if (functionalities.includes('update')) { %>
export const mockUpdate<%= name %>Dto: Update<%= name %>Dto = {
    // provide necessary fields here @update-dto
};
<% } %>
export const mock<%= name %>: <%= name %> = {
    id: '<%= Math.floor(Math.random() * 100) %>',
    <% if (typeof fields !== 'undefined' && fields.length > 0) { %>
        <% fields.filter(field => field.includeInDTO).forEach(field => { %>
            <% if (!field.optional) { %>
                <%= h.inflection.camelize(field.name, true) %>: 
                <% if (['varchar', 'text', 'uuid', 'custom', 'date', 'datetime', 'time', 'timestamp', 'json', 'enum'].includes(field.type)) { %>
                    '<%= field.example %>',
                <% } else if (['int', 'float', 'double', 'decimal'].includes(field.type)) { %>
                    <%= field.example %>,
                <% } else if (field.type === 'boolean') { %>
                    <%= field.example === 'true' || field.example === true ? 'true' : 'false' %>,
                <% } else { %>
                    <%= JSON.stringify(field.example) %>,
                <% } %>
            <% } %>
        <% }); %>
    <% } %>
    createdAt: new Date('<%= new Date().toISOString() %>'),
    updatedAt: new Date('<%= new Date().toISOString() %>'),
    // provide necessary fields here @mock-obj
};