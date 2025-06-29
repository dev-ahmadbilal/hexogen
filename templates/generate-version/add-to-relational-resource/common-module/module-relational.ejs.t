---
sh: |
  TARGET_FILE="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
  if [ -f "$TARGET_FILE" ] && [ -s "$TARGET_FILE" ]; then
    sed -i.bak '/imports: \[/s/\(imports: \[\)/\1Relational<%= name %>PersistenceModule<%= version.toUpperCase() %>, /' "$TARGET_FILE"
    rm -f "$TARGET_FILE.bak"
  fi
---
