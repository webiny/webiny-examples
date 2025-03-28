export abstract class AbstractMigrator {
    public readonly sourceApiUrl: string;
    public readonly sourceApiKey: string;
    public readonly targetApiUrl: string;
    public readonly targetApiKey: string;

    protected constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string
    ) {
        this.sourceApiUrl = sourceApiUrl;
        this.sourceApiKey = sourceApiKey;
        this.targetApiUrl = targetApiUrl;
        this.targetApiKey = targetApiKey;
    }

    abstract run(): void;
}
