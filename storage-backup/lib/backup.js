const AWS = require("aws-sdk");
const { Client } = require("@elastic/elasticsearch");
const esConnector = require("aws-elasticsearch-connector");

const timestamp = new Date().toISOString().substr(0, 19).replace(/\:/g, "");

const backupDynamoDB = async ({ REGION, DB_TABLE, PREFIX, S3_BUCKET }) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true,
    region: REGION,
  });

  let ddbItems = [];

  let lastEvaluatedKey = undefined;
  while (true) {
    const { Items, LastEvaluatedKey } = await documentClient
      .scan({ TableName: DB_TABLE, ExclusiveStartKey: lastEvaluatedKey })
      .promise();

    if (Items.length > 0) {
      ddbItems = [...ddbItems, ...Items];
    }

    if (LastEvaluatedKey) {
      lastEvaluatedKey = LastEvaluatedKey;
    }
    break;
  }

  console.log(`[DynamoDB] Loaded ${ddbItems.length} items`);

  const s3 = new AWS.S3({ region: REGION });
  await s3
    .putObject({
      Bucket: S3_BUCKET,
      Key: `${PREFIX}-${DB_TABLE}-${timestamp}.json`,
      Body: JSON.stringify(ddbItems),
    })
    .promise();
};

const backupElasticSearch = async ({
  REGION,
  ELASTIC_ENDPOINT,
  PREFIX,
  S3_BUCKET,
}) => {
  const elasticsearch = new Client({
    ...esConnector(AWS.config),
    node: ELASTIC_ENDPOINT,
  });

  const limit = 1000;
  let hasMoreItems = true;
  let after = undefined;
  let esItems = [];

  while (hasMoreItems) {
    const response = await elasticsearch.search({
      body: {
        sort: {
          createdOn: {
            order: "asc",
            // eslint-disable-next-line
            unmapped_type: "date",
          },
        },
        size: limit + 1,
        after,
      },
    });
    const { hits } = response.body.hits;

    hasMoreItems = hits.length > limit;
    after = hasMoreItems ? hits[limit - 1].sort : undefined;
    esItems = [...esItems, ...hits];
  }

  console.log(`[Elasticsearch] Loaded ${esItems.length} items`);
  const s3 = new AWS.S3({ region: REGION });
  await s3
    .putObject({
      Bucket: S3_BUCKET,
      Key: `${PREFIX}-elasticsearch-${timestamp}.json`,
      Body: JSON.stringify(esItems),
    })
    .promise();
};

module.exports = {
  backupDynamoDB,
  backupElasticSearch,
};
