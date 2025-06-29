---
sh: |
  TARGET_FILE="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
  if [ -f "$TARGET_FILE" ] && [ -s "$TARGET_FILE" ]; then
    sed -i.bak '/providers: \[/s/\(providers: \[\)/\1<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>, /' "$TARGET_FILE"
    rm -f "$TARGET_FILE.bak"
  fi
---
