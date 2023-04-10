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
#        ./codemod-test-fixture.sh ember-app-flat
#
#      Choice b. Run the codemod with the optional arguments. (For named arguments,
#      do not include `=` between the flag and the value. Positional arguments must
#      appear at the end.)
#
#        ./codemod-test-fixture.sh -s app ember-app-flat
#
#---------

# Read the named arguments
while getopts ":s:" flag
do
  case $flag in
    s) SRC=$OPTARG;;
  esac
done

# Read the positional arguments
FIXTURE=${@:$OPTIND:1}

if [ ! $FIXTURE ]
then
  echo "ERROR: Please specify the fixture name (e.g. ember-app-flat).\n"
  exit 1
elif [ ! -d "tests/fixtures/$FIXTURE/input" ]
then
  echo "ERROR: Input folder \`tests/fixtures/$FIXTURE/input\` does not exist.\n"
  exit 1
fi

rm -r "tests/fixtures/$FIXTURE/output"
cp -r "tests/fixtures/$FIXTURE/input" "tests/fixtures/$FIXTURE/output"

./bin/type-css-modules.js \
  --root="tests/fixtures/$FIXTURE/output" \
  --src=$SRC

echo "SUCCESS: Updated the output of $FIXTURE.\n"
