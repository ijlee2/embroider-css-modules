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
rm -r "tests/fixtures/ember-app/ember-container-query-glint/output"
cp -r "tests/fixtures/ember-app/ember-container-query-glint/input" "tests/fixtures/ember-app/ember-container-query-glint/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-app/ember-container-query-glint/output" \
  --type app

# Update fixtures
rm -r "tests/fixtures/ember-app/ember-container-query-javascript/output"
cp -r "tests/fixtures/ember-app/ember-container-query-javascript/input" "tests/fixtures/ember-app/ember-container-query-javascript/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-app/ember-container-query-javascript/output" \
  --type app

# Update fixtures
rm -r "tests/fixtures/ember-app/ember-container-query-nested/output"
cp -r "tests/fixtures/ember-app/ember-container-query-nested/input" "tests/fixtures/ember-app/ember-container-query-nested/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --component-structure nested \
  --root "tests/fixtures/ember-app/ember-container-query-nested/output" \
  --type app

# Update fixtures
rm -r "tests/fixtures/ember-app/ember-container-query-typescript/output"
cp -r "tests/fixtures/ember-app/ember-container-query-typescript/input" "tests/fixtures/ember-app/ember-container-query-typescript/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-app/ember-container-query-typescript/output" \
  --type app

# Update fixtures
rm -r "tests/fixtures/ember-v2-addon/my-v2-addon-glint/output"
cp -r "tests/fixtures/ember-v2-addon/my-v2-addon-glint/input" "tests/fixtures/ember-v2-addon/my-v2-addon-glint/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-v2-addon/my-v2-addon-glint/output" \
  --type v2-addon

# Update fixtures
rm -r "tests/fixtures/ember-v2-addon/my-v2-addon-javascript/output"
cp -r "tests/fixtures/ember-v2-addon/my-v2-addon-javascript/input" "tests/fixtures/ember-v2-addon/my-v2-addon-javascript/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-v2-addon/my-v2-addon-javascript/output" \
  --type v2-addon

# Update fixtures
rm -r "tests/fixtures/ember-v2-addon/my-v2-addon-nested/output"
cp -r "tests/fixtures/ember-v2-addon/my-v2-addon-nested/input" "tests/fixtures/ember-v2-addon/my-v2-addon-nested/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --component-structure nested \
  --root "tests/fixtures/ember-v2-addon/my-v2-addon-nested/output" \
  --type v2-addon

# Update fixtures
rm -r "tests/fixtures/ember-v2-addon/my-v2-addon-typescript/output"
cp -r "tests/fixtures/ember-v2-addon/my-v2-addon-typescript/input" "tests/fixtures/ember-v2-addon/my-v2-addon-typescript/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --root "tests/fixtures/ember-v2-addon/my-v2-addon-typescript/output" \
  --type v2-addon
