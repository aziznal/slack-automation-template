export async function getPullrequestInfo(): Promise<string> {
  // set these to your own credentials
  // e.g. github.com/aziznal/slack-automation-template means the OWNER is "aziznal" and REPOSITORY_NAME is "slack-automation-template"
  const owner = "";
  const repositoryName = "";

  const res = await fetch(
    // @see https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28&tool=curl
    `https://api.github.com/repos/${owner}/${repositoryName}/pulls`,
    {
      headers: {
        Accept: "application/vnd.github+json",

        // note: if your repository is public, you probably don't need an API key.
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,

        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const prs = (await res.json()) as unknown[];

  return `There are ${prs.length} pull requests pending review.`;
}
