const base = require("../../jest.config.base");

// Finally, export Jest config to be used while tests are being run.
module.exports = { ...base({ path: __dirname }) };
