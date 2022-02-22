// Import config from the project root.
const rootConfig = require("../../../tailwind.config");

module.exports = {
    ...rootConfig,
    // Override paths to be relative to this file
    content: ["./public/*.html", "./src/**/*.tsx"]
};
