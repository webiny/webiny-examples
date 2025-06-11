export abstract class AbstractMigrator {
    public readonly sourceApiUrl: string;
    public readonly sourceRootTenantApiKey: string;
    public readonly sourceTenantApiKey: string;
    public readonly targetApiUrl: string;
    public readonly targetApiKey: string;
    public readonly tenantId: string;

    protected constructor(
        sourceApiUrl: string,
        sourceRootTenantApiKey: string,
        sourceTenantApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        this.sourceApiUrl = sourceApiUrl;
        this.sourceRootTenantApiKey = sourceRootTenantApiKey;
        this.sourceTenantApiKey = sourceTenantApiKey;
        this.targetApiUrl = targetApiUrl;
        this.targetApiKey = targetApiKey;
        this.tenantId = tenantId;
    }

    abstract run(): void;
}
