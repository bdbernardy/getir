const { MongoClient } = require('mongodb');

exports.client = new MongoClient(process.env.MONGO_URI);
