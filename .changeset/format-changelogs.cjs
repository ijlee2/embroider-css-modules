async function getDependencyReleaseLine(
  changesets,
  dependenciesUpdated,
  options,
) {
  const output = [
    'getDependencyReleaseLine',
    '',
    'changesets:',
    `${JSON.stringify(changesets)}`,
    '',
    'dependenciesUpdated:',
    `${dependenciesUpdated}`,
    '',
    'options:',
    `${options}`,
    '',
    '---',
  ].join('\n');

  return output;
}

async function getReleaseLine(changeset, type, options) {
  const output = [
    'getReleaseLine',
    '',
    'changeset.summary:',
    `${changeset.summary}`,
    '',
    'changeset.releases:',
    `${JSON.stringify(changeset.releases)}`,
    '',
    'changeset.commit:',
    `${changeset.commit}`,
    '',
    'type:',
    `${type}`,
    '',
    'options:',
    `${options}`,
    '',
    '---',
  ].join('\n');

  return output;
}

module.exports = {
  getDependencyReleaseLine,
  getReleaseLine,
};
