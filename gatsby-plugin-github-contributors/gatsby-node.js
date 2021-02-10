/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require("node-fetch");

// constants for your GraphQL Contributor type
const CONTRIBUTOR_NODE_TYPE = `Contributor`;

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { createNode } = actions;

  let contributors = [];
  const repoName = pluginOptions.repo;
  const githubRepoURL = `https://api.github.com/repos/${repoName}/contributors`;

  try {
    const response = await fetch(githubRepoURL);
    const responseJSON = await response.json();
    contributors = responseJSON;
    // loop through "contributors" and create Gatsby nodes
    contributors.forEach((contributor) =>
      createNode({
        ...contributor,
        id: createNodeId(`${CONTRIBUTOR_NODE_TYPE}-${contributor.id}`),
        parent: null,
        children: [],
        internal: {
          type: CONTRIBUTOR_NODE_TYPE,
          content: JSON.stringify(contributor),
          contentDigest: createContentDigest(contributor)
        }
      })
    );
  } catch (error) {
    console.error(error);
  }

  return;
};
