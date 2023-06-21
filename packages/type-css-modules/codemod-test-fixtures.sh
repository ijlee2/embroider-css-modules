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
  -a "--src app" \
  ember-app-flat

./codemod-test-fixture.sh \
  -a "--src app" \
  ember-app-module-css-extension

./codemod-test-fixture.sh \
  -a "--src app/components app/controllers" \
  ember-app-nested
