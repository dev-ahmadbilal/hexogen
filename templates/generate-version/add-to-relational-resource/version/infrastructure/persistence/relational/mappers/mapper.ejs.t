---
sh: |
  node "$HEXOGEN_PACKAGE_DIR/scripts/versioning/mappers.js" <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
