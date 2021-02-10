const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  // The Elasticsearch endpoint to use.
  node: "http://localhost:9200",
  // Max number of retries for each request.
  maxRetries: 5,
  // Max request timeout in milliseconds for each request.
  requestTimeout: 60000
});

/**
 * For this blog we're doing a very simple setup. No API. No Server.
 * The point is to demonstrate the "Elasticsearch" feature and not to build a full-fledged API server of any sort.
 * This function performs all the example operation mentioned in the blog post.
 */
const run = async () => {
  try {
    // Create index
    let response = await client.indices.create({
      // Name of the index you wish to create.
      index: "products"
    });

    // Index a single document
    response = await client.create({
      // Unique identifier for the document.
      // To automatically generate a document ID omit this parameter.
      id: 1,
      type: "doc",
      // The name of the index.
      index: "products",
      body: {
        id: 1,
        name: "iPhone 12",
        price: 699,
        description: "Blast past fast"
      }
    });

    // Index multiple documents using `bulk`
    const dataset = [
      {
        id: 2,
        name: "iPhone 12 mini",
        description: "Blast past fast.",
        price: 599
      },
      {
        id: 3,
        name: "iPhone 12 Pro",
        description: "It's a leap year.",
        price: 999
      },
      {
        id: 4,
        name: "iPhone 12 Pro max",
        description: "It's a leap year.",
        price: 1199
      }
    ];

    const body = dataset.flatMap((doc) => [
      { index: { _index: "products" } },
      doc
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      // Do something useful with it.
    }

    // Update document
    response = await client.update({
      // The name of the index.
      index: "products",
      // Document ID.
      id: 1,
      body: {
        script: {
          source: "ctx._source.price += params.price_diff",
          params: {
            price_diff: 99
          }
        }
      }
    });

    // Delete a indexed document
    response = await client.delete({
      // The name of the index.
      index: "products",
      // Document ID.
      id: 1
    });

    /* ----------------- Perform search ----------------- */

    // Let's search!
    const { body: searchBody } = await client.search({
      // The name of the index.
      index: "products",
      body: {
        // Defines the search definition using the Query DSL.
        query: {
          match: {
            description: "blast"
          }
        }
      }
    });
  } catch (error) {
    console.log("Oops! Something went wrong. Let's see...\n");
    console.log(error);
  }
};

// Let's run the main function.
run();
