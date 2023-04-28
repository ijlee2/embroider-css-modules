const { getInfo } = require('@changesets/get-github-info');

const repo = 'ijlee2/embroider-css-modules';

async function extractInformation(changeset) {
  const { links: info } = await getInfo({
    commit: changeset.commit,
    repo,
  });

  const contributor = info.user ? `(${info.user})` : undefined;
  const link = info.pull ?? info.commit ?? undefined;
  const summary = (changeset.summary ?? '').split('\n')[0].trim();

  return {
    contributor,
    link,
    summary,
  };
}

async function getDependencyReleaseLine(
  changesets,
  dependenciesUpdated,
  options,
) {
  if (dependenciesUpdated.length === 0) {
    return '';
  }

  const changesetLink = `- Updated dependencies [${(
    await Promise.all(
      changesets.map(async (cs) => {
        if (cs.commit) {
          const { links } = await getInfo({
            repo: 'ijlee2/embroider-css-modules',
            commit: cs.commit,
          });

          return links.commit;
        }
      }),
    )
  )
    .filter((_) => _)
    .join(', ')}]:`;

  const updatedDepenenciesList = dependenciesUpdated.map((dependency) => {
    return `  - ${dependency.name}@${dependency.newVersion}`;
  });

  return [changesetLink, ...updatedDepenenciesList].join('\n');
}

async function getReleaseLine(changeset) {
  const { contributor, link, summary } = await extractInformation(changeset);

  const line = [link, summary, contributor].filter(Boolean).join(' ');

  return `- ${line}`;
}

module.exports = {
  getDependencyReleaseLine,
  getReleaseLine,
};
