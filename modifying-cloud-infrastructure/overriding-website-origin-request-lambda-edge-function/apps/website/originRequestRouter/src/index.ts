import { handler as defaultOriginRequestHandler } from "@webiny/pulumi-aws/components/tenantRouter/functions/origin/request";

export const handler = (event: any) => {
    // Extra logic can be added here.

    // We must not forget to run the default handler code, because
    // otherwise the multi-tenancy routing will stop working.
    return defaultOriginRequestHandler(event);
};
