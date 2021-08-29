import invariant from "invariant";
import { startApp, buildApp } from "@webiny/project-utils";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";
import AntdScssThemePlugin from "antd-scss-theme-plugin";

// Exports fundamental start (watch) and build commands.
// Within both commands, we rely on the deployed GraphQL API (project-applications-path/api) and its stack
// output to retrieve the URL over which the GraphQL API is accessible. If needed, additional
// information can be retrieved too, but remember to export it in the cloud infrastructure
// code, in the following files:
// - `project-applications-path/api/pulumi/dev/index.ts`
// - `project-applications-path/api/pulumi/prod/index.ts`

const MAP = {
    REACT_APP_GRAPHQL_API_URL: "${graphqlApiUrl}"
};

const NO_ENV_MESSAGE = `Please specify the environment via the "--env" argument, for example: "--env dev".`;

export default {
    commands: {
        async watch(options, context) {
            invariant(options.env, NO_ENV_MESSAGE);
            Object.assign(
                process.env,
                getStackOutput("project-applications-path/api", options.env, MAP)
            );

            // Starts local application development.
            await startApp(
                {
                    ...options,
                    webpack(config) {
                        config.plugins.push(
                            new AntdScssThemePlugin(__dirname + "/src/styles/theme.scss")
                        );

                        config.module.rules.push({
                            test: /\.less$/,
                            use: [
                                {
                                    loader: "style-loader",
                                    options: {
                                        sourceMap: process.env.NODE_ENV !== "production"
                                    }
                                },
                                {
                                    loader: "css-loader",
                                    options: {
                                        importLoaders: 1,
                                        sourceMap: process.env.NODE_ENV !== "production"
                                    }
                                },
                                "less-loader"
                            ]
                        });

                        return config;
                    },
                    babel(config) {
                        config.plugins.push([
                            require.resolve("babel-plugin-import"),
                            {
                                libraryName: "antd",
                                style: true
                            }
                        ]);
                        return config;
                    }
                },
                context
            );
        },
        async build(options, context) {
            invariant(options.env, NO_ENV_MESSAGE);
            Object.assign(
                process.env,
                getStackOutput("project-applications-path/api", options.env, MAP)
            );

            // Creates a production build of your application, ready to be deployed to
            // a hosting provider of your choice, for example Amazon S3.
            await buildApp(options, context);
        }
    }
};
