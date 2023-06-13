#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix the expected output of a test fixture after updating the source code.
#
#  B. Usage
#
#    ./codemod-test-fixture.sh [OPTIONAL-FLAGS] <FIXTURE-NAME>
#
#    Step 1. Run the script to update the files in `tests/fixtures/<FIXTURE-NAME>/output`.
#
#      Choice a. Run the codemod without the optional arguments.
#
#        ./codemod-test-fixture.sh ember-container-query-glint
#
#      Choice b. Run the codemod with the optional arguments. (For named arguments,
#      do not include `=` between the flag and the value. Positional arguments must
#      appear at the end.)
#
#        ./codemod-test-fixture.sh -s nested ember-container-query-nested
#
#---------

# Read the named arguments
while getopts ":s:" flag
do
  case $flag in
    s) COMPONENT_STRUCTURE=$OPTARG;;
  esac
done

# Read the positional arguments
FIXTURE=${@:$OPTIND:1}

if [ ! $FIXTURE ]
then
  echo "ERROR: Please specify the fixture name (e.g. ember-container-query-glint).\n"
  exit 1
elif [ ! -d "tests/fixtures/$FIXTURE/input" ]
then
  echo "ERROR: Input folder \`tests/fixtures/$FIXTURE/input\` does not exist.\n"
  exit 1
fi

rm -r "tests/fixtures/$FIXTURE/output"
cp -r "tests/fixtures/$FIXTURE/input" "tests/fixtures/$FIXTURE/output"

./dist/bin/ember-codemod-remove-ember-css-modules.js \
  --component-structure=$COMPONENT_STRUCTURE \
  --root="tests/fixtures/$FIXTURE/output"

echo "SUCCESS: Updated the output of $FIXTURE.\n"
