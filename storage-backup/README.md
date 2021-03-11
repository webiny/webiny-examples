# storage-backup

This example contains a script you can use (and modify to better suit your needs) to make a full backup of your DynamoDB table and Elasticsearch Domain, by reading all data and storing it to S3 as plain JSON.

See [examples/example-backup.js](./examples/example-backup.js) on how to use the tools. You can run this from local system, or deploy as Lambda and run it directly in the cloud. 
