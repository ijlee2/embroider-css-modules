#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/ember-app-flat/output"
cp -r "tests/fixtures/ember-app-flat/input" "tests/fixtures/ember-app-flat/output"

./dist/bin/type-css-modules.js \
  --root "tests/fixtures/ember-app-flat/output" \
  --src app

# Update fixtures
rm -r "tests/fixtures/ember-app-module-css-extension/output"
cp -r "tests/fixtures/ember-app-module-css-extension/input" "tests/fixtures/ember-app-module-css-extension/output"

./dist/bin/type-css-modules.js \
  --root "tests/fixtures/ember-app-module-css-extension/output" \
  --src app

# Update fixtures
rm -r "tests/fixtures/ember-app-nested/output"
cp -r "tests/fixtures/ember-app-nested/input" "tests/fixtures/ember-app-nested/output"

./dist/bin/type-css-modules.js \
  --root "tests/fixtures/ember-app-nested/output" \
  --src app/components app/controllers
