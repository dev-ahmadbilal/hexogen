---
sh: |
  node "$HEXOGEN_PACKAGE_DIR/scripts/versioning/domain.js" <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
