#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./codemod-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

./codemod-test-fixture.sh \
  -N "--type app" \
  ember-app/ember-container-query-glint

./codemod-test-fixture.sh \
  -N "--type app" \
  ember-app/ember-container-query-javascript

./codemod-test-fixture.sh \
  -N "--component-structure nested --type app" \
  ember-app/ember-container-query-nested

./codemod-test-fixture.sh \
  -N "--type app" \
  ember-app/ember-container-query-typescript

./codemod-test-fixture.sh \
  -N "--type v2-addon" \
  ember-v2-addon/my-v2-addon-glint

./codemod-test-fixture.sh \
  -N "--type v2-addon" \
  ember-v2-addon/my-v2-addon-javascript

./codemod-test-fixture.sh \
  -N "--component-structure nested --type v2-addon" \
  ember-v2-addon/my-v2-addon-nested

./codemod-test-fixture.sh \
  -N "--type v2-addon" \
  ember-v2-addon/my-v2-addon-typescript
