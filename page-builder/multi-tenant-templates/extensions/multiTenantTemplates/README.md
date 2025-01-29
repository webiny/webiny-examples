## Multi-tenant Templates

This extensions demonstrates how to create Page Builder templates that are automatically shared across all tenants in a multi-tenant Webiny project. In other words, upon creating a new tenants, any template that was created within the root tenant will be automatically copied to the new tenant.

Check out the code in `extensions/multiTenantTemplates/src/index.ts` file to see how this is done.

> [!NOTE]
> This extension is a demonstration of how to share templates across tenants. It is not a full-fledged solution and may require additional work to be used in a production environment. For example, one might want to filter which templates are shared across tenants. Another piece of functionality that's missing here is copying of templates that are created after the tenant is created.

## Testing

To test this extension, simply create a page template in the root tenant and then create a new tenant. You should see that the template is automatically copied to the new tenant.