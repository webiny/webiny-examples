# 3.2 Tagging Resources

[Watch the video](https://drive.google.com/file/d/1zBrmTW-VDXWTE1x_Vi_ixCmiZpexT1nS/view)

## Using the Code

Follow the steps below to quickly set up this example into your Webiny project: 

1. Clone this `webiny-examples` repository.
2. Copy the contents of the [extensions](./extensions) folder into your project's `extensions` folder. 
3. In your project, run `yarn webiny link-extensions` to link the new extensions with your project.
4. Copy the contents of the [apps](./apps) folder into your project's `apps` folder.
5. Add `extensions/pulumi` to the `workspaces.packages` array, located in your project root's `package.json` file.
6. Run `yarn`.
7. [Deploy your project](https://www.webiny.com/docs/core-development-concepts/basics/project-deployment) or [start your Admin app locally](https://www.webiny.com/docs/core-development-concepts/basics/watch-command#watching-project-applications)

**Further Reading**

‣ Modify Cloud Infrastructure - [https://www.webiny.com/docs/core-development-concepts/basics/extensions](https://www.webiny.com/docs/infrastructure/basics/modify-cloud-infrastructure)

‣ Webiny’s Cloud Architecture - https://www.webiny.com/docs/architecture/introduction

‣ Project Deployment - https://www.webiny.com/docs/core-development-concepts/basics/project-deployment