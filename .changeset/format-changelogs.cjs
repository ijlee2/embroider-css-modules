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

async function getDependencyReleaseLine(changesets, dependenciesUpdated) {
  if (dependenciesUpdated.length === 0) {
    return '';
  }

  const commits = changesets.map((changeset) => {
    return `[${changeset.commit}](https://github.com/${repo}/commit/${changeset.commit})`;
  });

  let line = `- Updated dependencies (${commits.join(', ')})`;

  dependenciesUpdated.forEach((dependency) => {
    line += `  - ${dependency.name}@${dependency.newVersion}`;
  });

  return line;
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
