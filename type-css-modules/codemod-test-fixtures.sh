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

./codemod-test-fixture.sh -s "app" ember-app-flat
./codemod-test-fixture.sh -s "app" ember-app-nested
