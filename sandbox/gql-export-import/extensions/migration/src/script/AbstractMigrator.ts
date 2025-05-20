export abstract class AbstractMigrator {
    public readonly sourceApiUrl: string;
    public readonly sourceApiKey: string;
    public readonly targetApiUrl: string;
    public readonly targetApiKey: string;
    public readonly tenantId: string;

    protected constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        this.sourceApiUrl = sourceApiUrl;
        this.sourceApiKey = sourceApiKey;
        this.targetApiUrl = targetApiUrl;
        this.targetApiKey = targetApiKey;
        this.tenantId = tenantId;
    }

    abstract run(): void;
}
