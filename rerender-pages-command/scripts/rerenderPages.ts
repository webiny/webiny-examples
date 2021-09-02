import getStackOutput from "@webiny/cli-plugin-deploy-pulumi/utils/getStackOutput";
import { GraphQLClient } from "graphql-request";
import fetch from "node-fetch";

// Or pull from env variables (.env or env.{environment-name} files).
const API_TOKEN = "xxx";

export default {
    type: "cli-command",
    name: "cli-command-rerender",
    // Here we create the command, using "yargs" library.
    create({ yargs, context }) {
        yargs.example("$0 rerender-pages ");
        yargs.command(
            "rerender-pages",
            `Re-renders all published pages created with the Page Builder application.`,
            {},
            // This is the function that'll be called when the command is executed.
            async args => {
                // Get exports from `api` stack, for `args.env` environment.
                const { apiUrl } = await getStackOutput("api", args.env);

                const client = new GraphQLClient(`${apiUrl}/graphql`, {
                    headers: {
                        authorization: API_TOKEN
                    }
                });

                const pages = await client
                    .request(LIST_PUBLISHED_PAGES)
                    .then(data => data.pageBuilder.listPublishedPages.data);

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    const { status } = await fetch(page.url);
                    if (status !== 100) {
                        try {
                            await client.request(RERENDER_PAGE, page);
                            context.success(
                                `Successfully re-rendered ${context.success.hl(page.url)} page.`
                            );
                        } catch (e) {
                            context.error(
                                `Could not re-render ${context.success.hl(page.url)} page:`
                            );
                            console.log(e.message);
                        }
                    }
                }
            }
        );
    }
};

const LIST_PUBLISHED_PAGES = /* GraphQL */ `
    {
        pageBuilder {
            listPublishedPages {
                data {
                    id
                    title
                    url
                }
            }
        }
    }
`;

// Creates a new revision of specified pages.
const RERENDER_PAGE = /* GraphQL */ `
    mutation ReRenderPage($id: ID!) {
        pageBuilder {
            rerenderPage(id: $id) {
                data {
                    id
                }
                error {
                    data
                    code
                    message
                }
            }
        }
    }
`;
