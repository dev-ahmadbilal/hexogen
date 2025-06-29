---
sh: |
  node "$HEXOGEN_PACKAGE_DIR/scripts/versioning/entities.js" <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
