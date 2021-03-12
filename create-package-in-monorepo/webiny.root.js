module.exports = {
    template: "@webiny/cwp-template-aws@5.0.0-beta.4",
    projectName: "cwp-beta",
    cli: {
        plugins: [
            require("@webiny/cli-plugin-workspaces")(),
            require("@webiny/cli-plugin-deploy-pulumi")(),
            require("@webiny/api-page-builder/cli")(),
            require("@webiny/cwp-template-aws/cli")()
        ]
    }
};
