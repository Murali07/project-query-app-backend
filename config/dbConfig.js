const mongodb = require("mongodb");
const dbName = "query-app";
const dbUrl = process.env.MONGO_URL;

module.exports = {mongodb, dbName, dbUrl};