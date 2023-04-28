const {
  getInfo,
  getInfoFromPullRequest,
} = require('@changesets/get-github-info');

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

async function getReleaseLine(changeset, type, options) {
  let prFromSummary;
  let commitFromSummary;
  let usersFromSummary = [];

  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      let num = Number(pr);

      if (!isNaN(num)) {
        prFromSummary = num;
      }

      return '';
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit;

      return '';
    })
    .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
      usersFromSummary.push(user);

      return '';
    })
    .trim();

  const [firstLine, ...futureLines] = replacedChangelog
    .split('\n')
    .map((l) => l.trimRight());

  const links = await (async () => {
    if (prFromSummary !== undefined) {
      let { links } = await getInfoFromPullRequest({
        repo: 'ijlee2/embroider-css-modules',
        pull: prFromSummary,
      });

      if (commitFromSummary) {
        links = {
          ...links,
          commit: `[\`${commitFromSummary}\`](https://github.com/ijlee2/embroider-css-modules/commit/${commitFromSummary})`,
        };
      }

      return links;
    }

    const commitToFetchFrom = commitFromSummary || changeset.commit;

    if (commitToFetchFrom) {
      const { links } = await getInfo({
        repo: 'ijlee2/embroider-css-modules',
        commit: commitToFetchFrom,
      });

      return links;
    }

    return {
      commit: null,
      pull: null,
      user: null,
    };
  })();

  const users = usersFromSummary.length
    ? usersFromSummary
        .map((userFromSummary) => {
          return `[@${userFromSummary}](https://github.com/${userFromSummary})`;
        })
        .join(', ')
    : links.user;

  const prefix = [
    links.pull === null ? '' : ` ${links.pull}`,
    links.commit === null ? '' : ` ${links.commit}`,
    users === null ? '' : ` Thanks ${users}!`,
  ].join('');

  return `\n\n-${prefix ? `${prefix} -` : ''} ${firstLine}\n${futureLines
    .map((l) => `  ${l}`)
    .join('\n')}`;
}

module.exports = {
  getDependencyReleaseLine,
  getReleaseLine,
};
