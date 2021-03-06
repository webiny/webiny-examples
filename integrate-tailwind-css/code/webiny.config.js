const invariant = require("invariant");
const { startApp, buildApp } = require("@webiny/project-utils");
const { getStackOutput } = require("@webiny/cli-plugin-deploy-pulumi/utils");

const MAP = {
    REACT_APP_GRAPHQL_API_URL: "${apiUrl}/graphql",
    REACT_APP_API_URL: "${apiUrl}"
};

const NO_ENV_MESSAGE = `Please specify the environment via the "--env" argument, for example: "--env dev".`;
const NO_API_MESSAGE = env => {
    return `It seems that the API project application isn't deployed!\nBefore continuing, please deploy it by running the following command: yarn webiny deploy api --env=${env}`;
};

module.exports = {
    commands: {
        async start(options, context) {
            invariant(options.env, NO_ENV_MESSAGE);

            const output = await getStackOutput("api", options.env, MAP);
            invariant(output, NO_API_MESSAGE(options.env));

            Object.assign(process.env, output);

            // Start local development
            await startApp(
                {
                    ...options,
                    webpack(config) {
                        return require("./applyTailwindToWebpack")(config);
                    }
                },
                context
            );
        },
        async build(options, context) {
            invariant(options.env, NO_ENV_MESSAGE);

            const output = await getStackOutput("api", options.env, MAP);
            invariant(output, NO_API_MESSAGE(options.env));

            Object.assign(process.env, output);

            // Bundle app for deployment
            await buildApp(
                {
                    ...options,
                    webpack(config) {
                        return require("./applyTailwindToWebpack")(config);
                    }
                },
                context
            );
        }
    }
};
