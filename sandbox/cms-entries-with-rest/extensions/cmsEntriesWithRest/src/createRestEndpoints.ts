import { CreateApiAppParams } from "@webiny/serverless-cms-aws";
import { ApiGraphql } from "@webiny/pulumi-aws";

export const createRestEndpoints: NonNullable<CreateApiAppParams["pulumi"]> = app => {
  const graphQlModule = app.getModule(ApiGraphql);
  // add custom POST route
  graphQlModule.addRoute({
    name: "create",
    path: "/create",
    method: "GET"
  });
};
