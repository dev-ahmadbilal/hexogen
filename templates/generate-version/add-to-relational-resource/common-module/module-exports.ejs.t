---
sh: |
  TARGET_FILE="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
  if [ -f "$TARGET_FILE" ] && [ -s "$TARGET_FILE" ]; then
    sed -i.bak '/exports: \[/s/\(exports: \[\)/\1<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>, Relational<%= name %>PersistenceModule<%= version.toUpperCase() %>, /' "$TARGET_FILE"
    rm -f "$TARGET_FILE.bak"
  fi
---
