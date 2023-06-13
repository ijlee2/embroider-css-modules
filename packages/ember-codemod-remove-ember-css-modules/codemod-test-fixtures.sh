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

./codemod-test-fixture.sh -s "flat" ember-container-query-glint
./codemod-test-fixture.sh -s "flat" ember-container-query-javascript
./codemod-test-fixture.sh -s "nested" ember-container-query-nested
./codemod-test-fixture.sh -s "flat" ember-container-query-typescript
