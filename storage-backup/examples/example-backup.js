const { backupDynamoDB, backupElasticSearch } = require("../lib/backup");

(async () => {
  // AWS region
  const region = "eu-central-1";
  // DynamoDB table to backup
  const ddbTable = "webiny-007c30f";
  // Elasticsearch endpoint
  const elasticsearchEndpoint =
    "https://search-webiny-js-95e4184-ccpgtqtssliar3fztetlr2halm.eu-central-1.es.amazonaws.com";
  // S3 bucket to store backups to
  const s3Bucket = "fm-bucket-7ba6fa1";
  // File prefix; you can use your environment here (dev, prod)
  const prefix = "dev";

  /**
   * Read all data from DynamoDB table and store it into the given S3 bucket.
   * Example file: dev-webiny-007c30f-2021-03-11T163741.json
   */
  await backupDynamoDB({
    REGION: region,
    DB_TABLE: ddbTable,
    S3_BUCKET: s3Bucket,
    PREFIX: prefix,
  });

  /**
   * Read all data from Elasticsearch domain, and store into the given S3 bucket.
   * The backup will contain data from all indexes.
   */
  await backupElasticSearch({
    REGION: region,
    ELASTIC_ENDPOINT: elasticsearchEndpoint,
    S3_BUCKET: s3Bucket,
    PREFIX: prefix,
  });
})();
